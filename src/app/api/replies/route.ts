import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const courseSearchSql = `
    (
        LOWER(ai_replies.title) LIKE '%course enquiry%'
        OR LOWER(ai_replies.source) LIKE '%sit40521%'
        OR LOWER(ai_replies.source) LIKE '%kitchen management%'
        OR LOWER(emails.subject) LIKE '%sit40521%'
        OR LOWER(emails.subject) LIKE '%kitchen management%'
        OR LOWER(emails.subject) LIKE '%course%'
        OR LOWER(emails.message) LIKE '%sit40521%'
        OR LOWER(emails.message) LIKE '%kitchen management%'
        OR LOWER(emails.message) LIKE '%course%'
        OR LOWER(emails.message) LIKE '%tuition%'
        OR LOWER(emails.message) LIKE '%fee%'
        OR LOWER(emails.message) LIKE '%intake%'
        OR LOWER(emails.message) LIKE '%entry requirement%'
        OR LOWER(emails.message) LIKE '%work placement%'
        OR LOWER(emails.message) LIKE '%cricos%'
    )
`;

export async function GET(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const countOnly = url.searchParams.get("countOnly") === "true";
    const courseOnly = url.searchParams.get("courseOnly") === "true";
    const status = url.searchParams.get("status") ?? "Draft";

    if (countOnly) {
        const countResult = await pool.query(
            `
            SELECT COUNT(*)::int AS count
            FROM ai_replies
            LEFT JOIN emails ON emails.id = ai_replies.email_id
            WHERE ai_replies.user_id = $1
              AND ai_replies.status = $2
              ${courseOnly ? `AND ${courseSearchSql}` : ""}
            `,
            [user.id, status]
        );

        return NextResponse.json({
            count: countResult.rows[0]?.count ?? 0,
        });
    }

    const result = await pool.query(
        `
        SELECT
          ai_replies.id,
          ai_replies.title,
          ai_replies.recipient,
          ai_replies.source,
          ai_replies.preview,
          ai_replies.status,
          ai_replies.created_at AS "createdAt"
        FROM ai_replies
        LEFT JOIN emails ON emails.id = ai_replies.email_id
        WHERE ai_replies.user_id = $1
          ${courseOnly ? `AND ${courseSearchSql}` : ""}
        ORDER BY ai_replies.created_at DESC
        `,
        [user.id]
    );

    return NextResponse.json(result.rows);
}
