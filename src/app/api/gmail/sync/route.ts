// import { google } from "googleapis";
// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";
// import { detectUrgency, generateSuggestedReply, generateTaskTitle } from "@/lib/email-ai";
// import { getGoogleOAuthClient } from "@/lib/google";

// import libmime from "libmime";

// function getHeader(headers: any[], name: string) {
//     const value =
//         headers.find((header) => header.name.toLowerCase() === name.toLowerCase())
//             ?.value ?? "";

//     return libmime.decodeWords(value);
// }

// function decodeBase64Url(value: string) {
//     const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
//     return Buffer.from(normalized, "base64").toString("utf-8");
// }

// function findPart(payload: any, mimeType: string): any {
//     if (!payload) {
//         return null;
//     }

//     if (payload.mimeType === mimeType && payload.body?.data) {
//         return payload;
//     }

//     if (payload.parts?.length) {
//         for (const part of payload.parts) {
//             const found = findPart(part, mimeType);

//             if (found) {
//                 return found;
//             }
//         }
//     }

//     return null;
// }

// function cleanEmailText(value: string) {
//     return value
//         .replace(/<style[\s\S]*?<\/style>/gi, "")
//         .replace(/<script[\s\S]*?<\/script>/gi, "")
//         .replace(/<[^>]+>/g, " ")
//         .replace(/&nbsp;/g, " ")
//         .replace(/&amp;/g, "&")
//         .replace(/&lt;/g, "<")
//         .replace(/&gt;/g, ">")
//         .replace(/https?:\/\/\S+/g, "")
//         .replace(/\s+/g, " ")
//         .trim();
// }

// function getMessageBody(payload: any, fallback = "") {
//     const textPart = findPart(payload, "text/plain");

//     if (textPart?.body?.data) {
//         return cleanEmailText(decodeBase64Url(textPart.body.data));
//     }

//     const htmlPart = findPart(payload, "text/html");

//     if (htmlPart?.body?.data) {
//         return cleanEmailText(decodeBase64Url(htmlPart.body.data));
//     }

//     if (payload?.body?.data) {
//         return cleanEmailText(decodeBase64Url(payload.body.data));
//     }

//     return cleanEmailText(fallback);
// }

// export async function POST() {
//     const accountResult = await pool.query(
//         `
//     SELECT *
//     FROM connected_accounts
//     WHERE provider = 'google'
//     ORDER BY created_at DESC
//     LIMIT 1
//     `
//     );

//     if (accountResult.rows.length === 0) {
//         return NextResponse.json(
//             { error: "No Gmail account connected" },
//             { status: 400 }
//         );
//     }

//     const account = accountResult.rows[0];

//     const oauth2Client = getGoogleOAuthClient();

//     oauth2Client.setCredentials({
//         access_token: account.access_token,
//         refresh_token: account.refresh_token,
//         expiry_date: Number(account.expiry_date),
//     });

//     const gmail = google.gmail({
//         version: "v1",
//         auth: oauth2Client,
//     });

//     const listResponse = await gmail.users.messages.list({
//         userId: "me",
//         maxResults: 50,
//         q: "newer_than:1d",
//     });

//     const messages = listResponse.data.messages ?? [];
//     const savedEmails = [];

//     for (const message of messages) {
//         if (!message.id) {
//             continue;
//         }

//         const messageResponse = await gmail.users.messages.get({
//             userId: "me",
//             id: message.id,
//             format: "full",
//         });

//         const payload = messageResponse.data.payload;
//         const headers = payload?.headers ?? [];

//         const subject = getHeader(headers, "Subject");
//         const sender = getHeader(headers, "From");

//         const messageBody = getMessageBody(
//             payload,
//             messageResponse.data.snippet ?? ""
//         ).slice(0, 2000);

//         const urgency = detectUrgency(`${subject} ${messageBody}`);


//         const existing = await pool.query(
//             `
//              SELECT id
//             FROM emails
//              WHERE gmail_message_id = $1
//             LIMIT 1
//             `,
//             [message.id]
//         );

//         if (existing.rows.length > 0) {
//             continue;
//         }

//         const client = await pool.connect();

//         try {
//             await client.query("BEGIN");


//             const receivedAt = messageResponse.data.internalDate
//                 ? new Date(Number(messageResponse.data.internalDate))
//                 : new Date();

//             const emailResult = await client.query(
//                 `
//   INSERT INTO emails (
//     gmail_message_id,
//     sender,
//     subject,
//     message,
//     urgency,
//     status,
//     received_at,
//     synced_at
//   )
//   VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
//   RETURNING *
//   `,
//                 [
//                     message.id,
//                     sender,
//                     subject,
//                     messageBody,
//                     urgency,
//                     "Not checked",
//                     receivedAt,
//                 ]
//             );
//             const email = emailResult.rows[0];

//             const replyText = generateSuggestedReply({
//                 sender,
//                 subject,
//                 message: messageBody,
//             });

//             await client.query(
//                 `
//         INSERT INTO ai_replies (email_id, title, recipient, source, preview, status)
//         VALUES ($1, $2, $3, $4, $5, $6)
//         `,
//                 [
//                     email.id,
//                     `Reply to ${sender}`,
//                     sender,
//                     subject,
//                     replyText,
//                     "Draft",
//                 ]
//             );

//             await client.query(
//                 `
//         INSERT INTO tasks (email_id, title, source, priority, status)
//         VALUES ($1, $2, $3, $4, $5)
//         `,
//                 [
//                     email.id,
//                     generateTaskTitle({
//                         sender,
//                         subject,
//                         message: messageBody,
//                     }),
//                     `${sender} email`,
//                     urgency,
//                     "Pending",
//                 ]
//             );

//             await client.query("COMMIT");
//             savedEmails.push(email);

//         } catch (error) {
//             await client.query("ROLLBACK");
//             console.error("Gmail sync insert error:", error);
//         } finally {
//             client.release();
//         }
//     }

//     return NextResponse.json({
//         fetched: messages.length,
//         synced: savedEmails.length,
//         emails: savedEmails,
//     });
// }

import { google } from "googleapis";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { detectUrgency, generateSuggestedReply, generateTaskTitle } from "@/lib/email-ai";
import { getGoogleOAuthClient } from "@/lib/google";
import { getCurrentUser } from "@/lib/auth";
import libmime from "libmime";

function getHeader(headers: any[], name: string) {
    const value =
        headers.find((header) => header.name.toLowerCase() === name.toLowerCase())
            ?.value ?? "";

    return libmime.decodeWords(value);
}

function decodeBase64Url(value: string) {
    const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(normalized, "base64").toString("utf-8");
}

function findPart(payload: any, mimeType: string): any {
    if (!payload) {
        return null;
    }

    if (payload.mimeType === mimeType && payload.body?.data) {
        return payload;
    }

    if (payload.parts?.length) {
        for (const part of payload.parts) {
            const found = findPart(part, mimeType);

            if (found) {
                return found;
            }
        }
    }

    return null;
}

function cleanEmailText(value: string) {
    return value
        .replace(/<style[\s\S]*?<\/style>/gi, "")
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/https?:\/\/\S+/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function getMessageBody(payload: any, fallback = "") {
    const textPart = findPart(payload, "text/plain");

    if (textPart?.body?.data) {
        return cleanEmailText(decodeBase64Url(textPart.body.data));
    }

    const htmlPart = findPart(payload, "text/html");

    if (htmlPart?.body?.data) {
        return cleanEmailText(decodeBase64Url(htmlPart.body.data));
    }

    if (payload?.body?.data) {
        return cleanEmailText(decodeBase64Url(payload.body.data));
    }

    return cleanEmailText(fallback);
}

export async function POST() {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const accountResult = await pool.query(
        `
        SELECT *
        FROM connected_accounts
        WHERE provider = 'google'
          AND user_id = $1
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [user.id]
    );

    if (accountResult.rows.length === 0) {
        return NextResponse.json(
            { error: "No Gmail account connected for this user" },
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

    const listResponse = await gmail.users.messages.list({
        userId: "me",
        maxResults: 50,
        q: "newer_than:1d",
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

        const subject = getHeader(headers, "Subject");
        const sender = getHeader(headers, "From");

        const messageBody = getMessageBody(
            payload,
            messageResponse.data.snippet ?? ""
        ).slice(0, 2000);

        const urgency = detectUrgency(`${subject} ${messageBody}`);

        const existing = await pool.query(
            `
            SELECT id
            FROM emails
            WHERE gmail_message_id = $1
              AND user_id = $2
            LIMIT 1
            `,
            [message.id, user.id]
        );

        if (existing.rows.length > 0) {
            continue;
        }

        const client = await pool.connect();

        try {
            await client.query("BEGIN");

            const receivedAt = messageResponse.data.internalDate
                ? new Date(Number(messageResponse.data.internalDate))
                : new Date();

            const emailResult = await client.query(
                `
                INSERT INTO emails (
                    user_id,
                    gmail_message_id,
                    sender,
                    subject,
                    message,
                    urgency,
                    status,
                    received_at,
                    synced_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
                RETURNING *
                `,
                [
                    user.id,
                    message.id,
                    sender,
                    subject,
                    messageBody,
                    urgency,
                    "Not checked",
                    receivedAt,
                ]
            );

            const email = emailResult.rows[0];

            const replyText = generateSuggestedReply({
                sender,
                subject,
                message: messageBody,
            });

            await client.query(
                `
                INSERT INTO ai_replies (
                    user_id,
                    email_id,
                    title,
                    recipient,
                    source,
                    preview,
                    status
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                `,
                [
                    user.id,
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
                INSERT INTO tasks (
                    user_id,
                    email_id,
                    title,
                    source,
                    priority,
                    status
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                `,
                [
                    user.id,
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
            console.error("Gmail sync insert error:", error);
        } finally {
            client.release();
        }
    }

    return NextResponse.json({
        fetched: messages.length,
        synced: savedEmails.length,
        emails: savedEmails,
    });
}