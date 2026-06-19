// // import { NextResponse } from "next/server";

// // export async function POST() {
// //     return NextResponse.json({
// //         preview: "This is a regenerated reply from the backend.",
// //         status: "Draft",
// //     });
// // }

// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";
// import { openai } from "@/lib/openai";

// type RouteParams = {
//     params: Promise<{
//         id: string;
//     }>;
// };

// export async function POST(_request: Request, { params }: RouteParams) {
//     const { id } = await params;

//     const replyResult = await pool.query(
//         `
//     SELECT
//       ai_replies.id,
//       ai_replies.email_id,
//       emails.sender,
//       emails.subject,
//       emails.message
//     FROM ai_replies
//     JOIN emails ON emails.id = ai_replies.email_id
//     WHERE ai_replies.id = $1
//     `,
//         [id]
//     );

//     if (replyResult.rows.length === 0) {
//         return NextResponse.json(
//             { error: "Reply not found" },
//             { status: 404 }
//         );
//     }

//     const email = replyResult.rows[0];

//     const completion = await openai.chat.completions.create({
//         model: "gpt-4.1-mini",
//         messages: [
//             {
//                 role: "system",
//                 content:
//                     "You write professional email replies. Keep replies clear, polite, useful, and concise. Do not invent details that are not in the email.",
//             },
//             {
//                 role: "user",
//                 content: `
// Write a reply to this email.

// Sender: ${email.sender}
// Subject: ${email.subject}
// Email message:
// ${email.message}

// Return only the reply text.
//         `,
//             },
//         ],
//     });

//     const newPreview =
//         completion.choices[0]?.message?.content?.trim() ??
//         "Thanks for your message. I will review this and get back to you shortly.";

//     const updatedReply = await pool.query(
//         `
//     UPDATE ai_replies
//     SET preview = $1, status = 'Draft'
//     WHERE id = $2
//     RETURNING
//       id,
//       title,
//       recipient,
//       source,
//       preview,
//       status,
//       created_at AS "createdAt"
//     `,
//         [newPreview, id]
//     );

//     return NextResponse.json(updatedReply.rows[0]);
// }


import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { openai } from "@/lib/openai";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

export async function POST(_request: Request, { params }: RouteParams) {
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
    `,
        [id]
    );

    if (replyResult.rows.length === 0) {
        return NextResponse.json(
            { error: "Reply not found" },
            { status: 404 }
        );
    }

    const email = replyResult.rows[0];

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content:
                        "You write professional email replies. Keep replies clear, polite, useful, and concise. Do not invent details.",
                },
                {
                    role: "user",
                    content: `Write a reply to this email.

Sender: ${email.sender}
Subject: ${email.subject}
Email message:
${email.message}

Return only the reply text.`,
                },
            ],
        });

        const newPreview =
            completion.choices[0]?.message?.content?.trim() ??
            "Thanks for your message. I will review this and get back to you shortly.";

        const updatedReply = await pool.query(
            `
      UPDATE ai_replies
      SET preview = $1, status = 'Draft'
      WHERE id = $2
      RETURNING
        id,
        title,
        recipient,
        source,
        preview,
        status,
        created_at AS "createdAt"
      `,
            [newPreview, id]
        );

        return NextResponse.json(updatedReply.rows[0]);
    }

    catch (error) {
        // return NextResponse.json(
        //     { error: "Failed to generate AI reply. Check your OpenAI API key." },
        //     { status: 500 }
        // );

        console.error("OpenAI regenerate error:", error);

        return NextResponse.json(
            {
                error: "Failed to generate AI reply",
                details: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}

