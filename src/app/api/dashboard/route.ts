import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  const emails = await pool.query(`
  SELECT
    id,
    sender AS "from",
    subject,
    message AS preview,
    urgency,
    status,
    received_at AS "receivedAt"
  FROM emails
  ORDER BY received_at DESC NULLS LAST, created_at DESC
  LIMIT 5
`);

  const replies = await pool.query(`
    SELECT id, title, recipient, source, preview, status
    FROM ai_replies
    ORDER BY created_at DESC
    LIMIT 5
  `);

  const tasks = await pool.query(`
    SELECT id, title, source, priority, status
    FROM tasks
    ORDER BY created_at DESC
    LIMIT 5
  `);

  const stats = await pool.query(`
    SELECT
      (SELECT COUNT(*) FROM emails)::int AS emails,
      (SELECT COUNT(*) FROM ai_replies)::int AS "aiReplies",
      (SELECT COUNT(*) FROM tasks)::int AS tasks,
      (SELECT COUNT(*) FROM emails WHERE urgency = 'High')::int AS urgent
  `);

  return NextResponse.json({
    emails: emails.rows,
    aiReplies: replies.rows,
    tasks: tasks.rows,
    stats: stats.rows[0],
  });
}