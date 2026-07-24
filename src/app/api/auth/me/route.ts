import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("session_token")?.value;

        if (!sessionToken) {
            return NextResponse.json({ user: null });
        }

        const sessionResult = await pool.query(
            `
      SELECT users.id, users.name, users.email, users.role
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token = $1
      LIMIT 1
      `,
            [sessionToken]
        );

        if (sessionResult.rows.length === 0) {
            return NextResponse.json({ user: null });
        }

        return NextResponse.json({
            user: sessionResult.rows[0],
        });
    } catch (error) {
        console.error("Auth me error:", error);

        return NextResponse.json(
            { user: null, error: "Failed to check logged in user" },
            { status: 500 }
        );
    }
}