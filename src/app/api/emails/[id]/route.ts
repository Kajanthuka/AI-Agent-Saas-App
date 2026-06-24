import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
    const { id } = await params;

    const emailResult = await pool.query(
        `
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
    WHERE id = $1
    `,
        [id]
    );

    if (emailResult.rows.length === 0) {
        return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const replyResult = await pool.query(
        `
    SELECT id, title, recipient, source, preview, status
    FROM ai_replies
    WHERE email_id = $1
    ORDER BY created_at DESC
    LIMIT 1
    `,
        [id]
    );

    const taskResult = await pool.query(
        `
    SELECT id, title, source, priority, status
    FROM tasks
    WHERE email_id = $1
    ORDER BY created_at DESC
    LIMIT 1
    `,
        [id]
    );

    return NextResponse.json({
        ...emailResult.rows[0],
        aiReply: replyResult.rows[0] ?? null,
        task: taskResult.rows[0] ?? null,
    });
}

export async function PATCH(request: Request, { params }: RouteParams) {
    const { id } = await params;
    const body = await request.json();

    const result = await pool.query(
        `
    UPDATE emails
    SET status = $1
    WHERE id = $2
    RETURNING
      id,
      sender AS "from",
      subject,
      message AS preview,
      urgency,
      status,
      created_at AS "createdAt"
    `,
        [body.status, id]
    );

    if (result.rows.length === 0) {
        return NextResponse.json(
            { error: "Email not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(result.rows[0]);
}

