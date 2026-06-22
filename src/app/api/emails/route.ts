import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import {
    detectUrgency,
    generateSuggestedReply,
    generateTaskTitle,
} from "@/lib/email-ai";

// export async function GET() {
//     const result = await pool.query(`
//     SELECT
//       id,
//       sender AS "from",
//       subject,
//       message AS preview,
//       urgency,
//       status,
//       created_at AS "createdAt"
//     FROM emails
//     ORDER BY created_at DESC
//   `);

//     return NextResponse.json(result.rows);
// }
// export async function GET() {
//     const result = await pool.query(`
//     SELECT
//       id,
//       sender AS "from",
//       subject,
//       message AS preview,
//       urgency,
//       status,
//       received_at AS "receivedAt",
//       created_at AS "createdAt"
//     FROM emails
//     ORDER BY received_at DESC NULLS LAST, created_at DESC
//   `);

//     return NextResponse.json(result.rows);
// }

export async function GET() {
    const result = await pool.query(`
    SELECT
      id,
      sender AS "from",
      subject,
      message AS preview,
      urgency,
      status,
      received_at AS "receivedAt",
      created_at AS "createdAt"
    FROM emails
    ORDER BY received_at DESC NULLS LAST, created_at DESC
  `);

    return NextResponse.json(result.rows);
}
export async function POST(request: Request) {
    const body = await request.json();

    const urgency = detectUrgency(`${body.subject} ${body.message}`);
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const emailResult = await client.query(
            `
      INSERT INTO emails (sender, subject, message, urgency, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
            [
                body.from,
                body.subject,
                body.message,
                urgency,
                body.status ?? "Not checked",
            ]
        );

        const email = emailResult.rows[0];

        const replyText = generateSuggestedReply({
            sender: email.sender,
            subject: email.subject,
            message: email.message,
        });

        //     const replyResult = await client.query(
        //         `
        //   INSERT INTO ai_replies (email_id, title, recipient, source, preview, status)
        //   VALUES ($1, $2, $3, $4, $5, $6) ORDER BY received_at DESC NULLS LAST, created_at DESC
        //   RETURNING *
        //   `,
        //         [
        //             email.id,
        //             `Reply to ${email.sender}`,
        //             email.sender,
        //             email.subject,
        //             replyText,
        //             "Draft",
        //         ]
        //     );

        const replyResult = await client.query(
            `
  INSERT INTO ai_replies (email_id, title, recipient, source, preview, status)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *
  `,
            [
                email.id,
                `Reply to ${email.sender}`,
                email.sender,
                email.subject,
                replyText,
                "Draft",
            ]
        );


        //     const taskResult = await client.query(
        //         `
        //   INSERT INTO tasks (email_id, title, source, priority, status)
        //   VALUES ($1, $2, $3, $4, $5) ORDER BY received_at DESC NULLS LAST, created_at DESC
        //   RETURNING *
        //   `,
        //         [
        //             email.id,
        //             generateTaskTitle({
        //                 sender: email.sender,
        //                 subject: email.subject,
        //                 message: email.message,
        //             }),
        //             `${email.sender} email`,
        //             urgency,
        //             "Pending",
        //         ]
        //     );

        const taskResult = await client.query(
            `
  INSERT INTO tasks (email_id, title, source, priority, status)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `,
            [
                email.id,
                generateTaskTitle({
                    sender: email.sender,
                    subject: email.subject,
                    message: email.message,
                }),
                `${email.sender} email`,
                urgency,
                "Pending",
            ]
        );

        await client.query("COMMIT");

        return NextResponse.json({
            email,
            aiReply: replyResult.rows[0],
            task: taskResult.rows[0],
        });

        // } catch (error) {
        //     await client.query("ROLLBACK");
        //     return NextResponse.json(
        //         { error: "Failed to create email" },
        //         { status: 500 }
        //     );
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Gmail sync insert error:", error);
    } finally {
        // } finally {
        client.release();
    }
}