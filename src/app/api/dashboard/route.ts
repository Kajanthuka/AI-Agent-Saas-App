import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const emails = await pool.query(
        `
        SELECT
          id,
          sender AS "from",
          subject,
          message AS preview,
          urgency,
          status,
          received_at AS "receivedAt"
        FROM emails
        WHERE user_id = $1
        ORDER BY received_at DESC NULLS LAST, created_at DESC
        LIMIT 5
        `,
        [user.id]
    );

    const replies = await pool.query(
        `
        SELECT
          id,
          title,
          recipient,
          source,
          preview,
          status
        FROM ai_replies
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [user.id]
    );

    const tasks = await pool.query(
        `
        SELECT
          id,
          title,
          source,
          priority,
          status
        FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [user.id]
    );

    const stats = await pool.query(
        `
        SELECT
          (SELECT COUNT(*) FROM emails WHERE user_id = $1)::int AS emails,
          (SELECT COUNT(*) FROM ai_replies WHERE user_id = $1)::int AS "aiReplies",
          (SELECT COUNT(*) FROM tasks WHERE user_id = $1)::int AS tasks,
          (SELECT COUNT(*) FROM emails WHERE user_id = $1 AND urgency = 'High')::int AS urgent
        `,
        [user.id]
    );

    return NextResponse.json({
        emails: emails.rows,
        aiReplies: replies.rows,
        tasks: tasks.rows,
        stats: stats.rows[0],
    });
}