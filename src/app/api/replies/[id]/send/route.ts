import { google } from "googleapis";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getGoogleOAuthClient } from "@/lib/google";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

function createEmailMessage({
    to,
    subject,
    body,
}: {
    to: string;
    subject: string;
    body: string;
}) {
    const message = [
        `To: ${to}`,
        `Subject: Re: ${subject}`,
        "Content-Type: text/plain; charset=utf-8",
        "",
        body,
    ].join("\n");

    return Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

function extractEmailAddress(value: string) {
    const match = value.match(/<(.+?)>/);
    return match?.[1] ?? value;
}

export async function POST(_request: Request, { params }: RouteParams) {
    const { id } = await params;

    const replyResult = await pool.query(
        `
    SELECT
      ai_replies.id,
      ai_replies.preview,
      ai_replies.status,
      emails.sender,
      emails.subject
    FROM ai_replies
    JOIN emails ON emails.id = ai_replies.email_id
    WHERE ai_replies.id = $1
    `,
        [id]
    );

    if (replyResult.rows.length === 0) {
        return NextResponse.json({ error: "Reply not found" }, { status: 404 });
    }

    const reply = replyResult.rows[0];

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

    const raw = createEmailMessage({
        to: extractEmailAddress(reply.sender),
        subject: reply.subject,
        body: reply.preview,
    });

    await gmail.users.messages.send({
        userId: "me",
        requestBody: {
            raw,
        },
    });

    const updatedReply = await pool.query(
        `
    UPDATE ai_replies
    SET status = 'Sent'
    WHERE id = $1
    RETURNING id, title, recipient, source, preview, status
    `,
        [id]
    );

    return NextResponse.json(updatedReply.rows[0]);
}