import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

async function getCurrentUser() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) return null;

    const result = await pool.query(
        `
    SELECT users.id, users.name, users.email, users.role
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = $1
    LIMIT 1
    `,
        [sessionToken]
    );

    return result.rows[0] ?? null;
}

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let result = await pool.query(
            `
      SELECT email_notifications, ai_reply_tone, daily_sync, theme
      FROM user_settings
      WHERE user_id = $1
      `,
            [user.id]
        );

        if (result.rows.length === 0) {
            result = await pool.query(
                `
        INSERT INTO user_settings (user_id)
        VALUES ($1)
        RETURNING email_notifications, ai_reply_tone, daily_sync, theme
        `,
                [user.id]
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Get settings error:", error);
        return NextResponse.json(
            { error: "Failed to load settings" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const {
            email_notifications,
            ai_reply_tone,
            daily_sync,
            theme,
        } = await request.json();

        const result = await pool.query(
            `
      INSERT INTO user_settings (
        user_id,
        email_notifications,
        ai_reply_tone,
        daily_sync,
        theme,
        updated_at
      )
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      ON CONFLICT (user_id)
      DO UPDATE SET
        email_notifications = EXCLUDED.email_notifications,
        ai_reply_tone = EXCLUDED.ai_reply_tone,
        daily_sync = EXCLUDED.daily_sync,
        theme = EXCLUDED.theme,
        updated_at = CURRENT_TIMESTAMP
      RETURNING email_notifications, ai_reply_tone, daily_sync, theme
      `,
            [
                user.id,
                email_notifications,
                ai_reply_tone,
                daily_sync,
                theme,
            ]
        );

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Update settings error:", error);
        return NextResponse.json(
            { error: "Failed to update settings" },
            { status: 500 }
        );
    }
}