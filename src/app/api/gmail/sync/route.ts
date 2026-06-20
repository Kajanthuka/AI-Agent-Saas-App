import { google } from "googleapis";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { detectUrgency, generateSuggestedReply, generateTaskTitle } from "@/lib/email-ai";
import { getGoogleOAuthClient } from "@/lib/google";

function getHeader(headers: { name?: string | null; value?: string | null }[], name: string) {
    return headers.find((header) => header.name?.toLowerCase() === name.toLowerCase())?.value ?? "";
}

function decodeBase64Url(value: string) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(normalized, "base64").toString("utf-8");
}

function getMessageBody(payload: any): string {
    if (payload.body?.data) {
        return decodeBase64Url(payload.body.data);
    }

    if (payload.parts?.length) {
        const textPart = payload.parts.find((part: any) => part.mimeType === "text/plain");

        if (textPart?.body?.data) {
            return decodeBase64Url(textPart.body.data);
        }

        for (const part of payload.parts) {
            const nested = getMessageBody(part);

            if (nested) {
                return nested;
            }
        }
    }

    return "";
}

export async function POST() {
    const accountResult = await pool.query(
        `
    SELECT *
    FROM connected_accounts
    WHERE provider = 'google'
    ORDER BY created_at DESC
    LIMIT 1
    `
    );

    if (accountResult.rows.length === 0) {
        return NextResponse.json(
            { error: "No Gmail account connected" },
            { status: 400 }
        );
    }

    const account = accountResult.rows[0];

    const oauth2Client = getGoogleOAuthClient();

    oauth2Client.setCredentials({
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        expiry_date: Number(account.expiry_date),
    });

    const gmail = google.gmail({
        version: "v1",
        auth: oauth2Client,
    });

    // const listResponse = await gmail.users.messages.list({
    //     userId: "me",
    //     maxResults: 10,
    //     q: "in:inbox",
    // });

    const listResponse = await gmail.users.messages.list({
        userId: "me",
        maxResults: 20,
        q: "in:inbox newer_than:1d",
    });

    const messages = listResponse.data.messages ?? [];
    const savedEmails = [];

    for (const message of messages) {
        if (!message.id) {
            continue;
        }

        const messageResponse = await gmail.users.messages.get({
            userId: "me",
            id: message.id,
            format: "full",
        });

        const payload = messageResponse.data.payload;
        const headers = payload?.headers ?? [];

        const sender = getHeader(headers, "From");
        const subject = getHeader(headers, "Subject") || "No subject";
        const messageBody = getMessageBody(payload) || messageResponse.data.snippet || "";
        const urgency = detectUrgency(`${subject} ${messageBody}`);

        const existing = await pool.query(
            `
      SELECT id
      FROM emails
      WHERE subject = $1 AND sender = $2
      LIMIT 1
      `,
            [subject, sender]
        );

        if (existing.rows.length > 0) {
            continue;
        }

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const emailResult = await client.query(
                `
        INSERT INTO emails (sender, subject, message, urgency, status)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
                [sender, subject, messageBody, urgency, "Not checked"]
            );

            const email = emailResult.rows[0];

            const replyText = generateSuggestedReply({
                sender,
                subject,
                message: messageBody,
            });

            await client.query(
                `
        INSERT INTO ai_replies (email_id, title, recipient, source, preview, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
                [
                    email.id,
                    `Reply to ${sender}`,
                    sender,
                    subject,
                    replyText,
                    "Draft",
                ]
            );

            await client.query(
                `
        INSERT INTO tasks (email_id, title, source, priority, status)
        VALUES ($1, $2, $3, $4, $5)
        `,
                [
                    email.id,
                    generateTaskTitle({
                        sender,
                        subject,
                        message: messageBody,
                    }),
                    `${sender} email`,
                    urgency,
                    "Pending",
                ]
            );

            await client.query("COMMIT");
            savedEmails.push(email);
        } catch (error) {
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }
    }

    return NextResponse.json({
        synced: savedEmails.length,
        emails: savedEmails,
    });
}