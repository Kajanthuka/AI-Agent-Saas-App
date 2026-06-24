// // // import { NextResponse } from "next/server";

// // // export async function POST() {
// // //     return NextResponse.json({
// // //         preview: "This is a regenerated reply from the backend.",
// // //         status: "Draft",
// // //     });
// // // }

// // import { NextResponse } from "next/server";
// // import { pool } from "@/lib/db";
// // import { openai } from "@/lib/openai";

// // type RouteParams = {
// //     params: Promise<{
// //         id: string;
// //     }>;
// // };

// // export async function POST(_request: Request, { params }: RouteParams) {
// //     const { id } = await params;

// //     const replyResult = await pool.query(
// //         `
// //     SELECT
// //       ai_replies.id,
// //       ai_replies.email_id,
// //       emails.sender,
// //       emails.subject,
// //       emails.message
// //     FROM ai_replies
// //     JOIN emails ON emails.id = ai_replies.email_id
// //     WHERE ai_replies.id = $1
// //     `,
// //         [id]
// //     );

// //     if (replyResult.rows.length === 0) {
// //         return NextResponse.json(
// //             { error: "Reply not found" },
// //             { status: 404 }
// //         );
// //     }

// //     const email = replyResult.rows[0];

// //     const completion = await openai.chat.completions.create({
// //         model: "gpt-4.1-mini",
// //         messages: [
// //             {
// //                 role: "system",
// //                 content:
// //                     "You write professional email replies. Keep replies clear, polite, useful, and concise. Do not invent details that are not in the email.",
// //             },
// //             {
// //                 role: "user",
// //                 content: `
// // Write a reply to this email.

// // Sender: ${email.sender}
// // Subject: ${email.subject}
// // Email message:
// // ${email.message}

// // Return only the reply text.
// //         `,
// //             },
// //         ],
// //     });

// //     const newPreview =
// //         completion.choices[0]?.message?.content?.trim() ??
// //         "Thanks for your message. I will review this and get back to you shortly.";

// //     const updatedReply = await pool.query(
// //         `
// //     UPDATE ai_replies
// //     SET preview = $1, status = 'Draft'
// //     WHERE id = $2
// //     RETURNING
// //       id,
// //       title,
// //       recipient,
// //       source,
// //       preview,
// //       status,
// //       created_at AS "createdAt"
// //     `,
// //         [newPreview, id]
// //     );

// //     return NextResponse.json(updatedReply.rows[0]);
// // }


// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";
// // import { openai } from "@/lib/openai";
// import { gemini } from "@/lib/gemini";

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

//     try {
//         //         const completion = await openai.chat.completions.create({
//         //             model: "gpt-4.1-mini",
//         //             messages: [
//         //                 {
//         //                     role: "system",
//         //                     content:
//         //                         "You write professional email replies. Keep replies clear, polite, useful, and concise. Do not invent details.",
//         //                 },
//         //                 {
//         //                     role: "user",
//         //                     content: `Write a reply to this email.

//         // Sender: ${email.sender}
//         // Subject: ${email.subject}
//         // Email message:
//         // ${email.message}

//         // Return only the reply text.`,
//         //                 },
//         //             ],
//         //         });


//         //         const newPreview =
//         //             completion.choices[0]?.message?.content?.trim() ??
//         //             "Thanks for your message. I will review this and get back to you shortly.";

//         const response = await gemini.models.generateContent({
//             model: "gemini-flash-latest",
//             contents: `You write professional email replies.

// Rules:
// - Keep it polite, clear, useful, and concise.
// - Do not invent details.
// - Return only the reply text.

// Write a reply to this email:

// Sender: ${email.sender}
// Subject: ${email.subject}
// Email message:
// ${email.message}`,
//         });

//         const newPreview =
//             response.text?.trim() ??
//             "Thanks for your message. I will review this and get back to you shortly.";

//         const updatedReply = await pool.query(
//             `
//       UPDATE ai_replies
//       SET preview = $1, status = 'Draft'
//       WHERE id = $2
//       RETURNING
//         id,
//         title,
//         recipient,
//         source,
//         preview,
//         status,
//         created_at AS "createdAt"
//       `,
//             [newPreview, id]
//         );

//         return NextResponse.json(updatedReply.rows[0]);
//     }

//     catch (error) {
//         // return NextResponse.json(
//         //     { error: "Failed to generate AI reply. Check your OpenAI API key." },
//         //     { status: 500 }
//         // );

//         // console.error("OpenAI regenerate error:", error);

//         // return NextResponse.json(
//         //     {
//         //         error: "Failed to generate AI reply",
//         //         details: error instanceof Error ? error.message : "Unknown error",
//         //     },
//         //     { status: 500 }
//         // );


//         console.error("Gemini regenerate error:", error);

//         return NextResponse.json(
//             // {
//             //     error: "Failed to generate AI reply with Gemini.",
//             //     details: error instanceof Error ? error.message : "Unknown error",
//             // },
//             // { status: 500 }
//             {
//                 error: "Gemini is temporarily busy. Please try again in a moment.",
//             },
//             { status: 503 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { gemini } from "@/lib/gemini";

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
            // console.error(`Gemini failed with ${model}:`, error);
            // console.error(`Gemini failed with ${model}:`, error);

            console.warn(`Gemini fallback: ${model} unavailable, trying next model.`);
            await wait(800);
        }
    }

    throw lastError;
}

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


    } catch (error) {
        // console.error("Gemini regenerate error:", error);

        // // console.warn(`Gemini fallback: ${model} unavailable, trying next model.`);

        // return NextResponse.json(
        //     {
        //         error:
        //             "Gemini is temporarily busy. Please wait a moment and try again.",
        //     },
        //     { status: 503 }
        // );

        console.error("Gemini regenerate error:", error);

        const fallbackReply = `Hi ${email.sender},

Thanks for your message. I will review this and get back to you shortly.

Kind regards`;

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
            [fallbackReply, id]
        );

        return NextResponse.json({
            ...updatedReply.rows[0],
            warning: "Gemini was temporarily busy, so a basic fallback reply was created.",
        });
    }


}