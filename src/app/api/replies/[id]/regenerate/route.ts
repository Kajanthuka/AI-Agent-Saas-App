import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { gemini } from "@/lib/gemini";
import { getCurrentUser } from "@/lib/auth";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateGeminiReply(prompt: string) {
    const models = [
        "gemini-2.5-flash-lite",
        "gemini-2.5-flash",
        "gemini-flash-latest",
    ];

    let lastError: unknown;

    for (const model of models) {
        try {
            const response = await gemini.models.generateContent({
                model,
                contents: prompt,
            });

            const text = response.text?.trim();

            if (text) {
                return text;
            }
        } catch (error) {
            lastError = error;
            console.warn(`Gemini fallback: ${model} unavailable, trying next model.`);
            await wait(800);
        }
    }

    throw lastError;
}

export async function POST(_request: Request, { params }: RouteParams) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const replyResult = await pool.query(
        `
        SELECT
          ai_replies.id,
          ai_replies.email_id,
          emails.sender,
          emails.subject,
          emails.message
        FROM ai_replies
        JOIN emails ON emails.id = ai_replies.email_id
        WHERE ai_replies.id = $1
          AND ai_replies.user_id = $2
        `,
        [id, user.id]
    );

    if (replyResult.rows.length === 0) {
        return NextResponse.json(
            { error: "Reply not found" },
            { status: 404 }
        );
    }

    const email = replyResult.rows[0];

    const prompt = `You write professional email replies.

Rules:
- Keep it polite, clear, useful, and concise.
- Do not invent details.
- Return only the reply text.

Write a reply to this email:

Sender: ${email.sender}
Subject: ${email.subject}
Email message:
${email.message}`;

    try {
        const newPreview = await generateGeminiReply(prompt);

        const updatedReply = await pool.query(
            `
            UPDATE ai_replies
            SET preview = $1, status = 'Draft'
            WHERE id = $2
              AND user_id = $3
            RETURNING
              id,
              title,
              recipient,
              source,
              preview,
              status,
              created_at AS "createdAt"
            `,
            [newPreview, id, user.id]
        );

        if (updatedReply.rows.length === 0) {
            return NextResponse.json(
                { error: "Reply not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedReply.rows[0]);
    } catch (error) {
        console.error("Gemini regenerate error:", error);

        const fallbackReply = `Hi ${email.sender},

Thanks for your message. I will review this and get back to you shortly.

Kind regards`;

        const updatedReply = await pool.query(
            `
            UPDATE ai_replies
            SET preview = $1, status = 'Draft'
            WHERE id = $2
              AND user_id = $3
            RETURNING
              id,
              title,
              recipient,
              source,
              preview,
              status,
              created_at AS "createdAt"
            `,
            [fallbackReply, id, user.id]
        );

        if (updatedReply.rows.length === 0) {
            return NextResponse.json(
                { error: "Reply not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            ...updatedReply.rows[0],
            warning: "Gemini was temporarily busy, so a basic fallback reply was created.",
        });
    }
}