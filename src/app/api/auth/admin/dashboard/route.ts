import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

async function requireAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) return null;

    const result = await pool.query(
        `
        SELECT users.id, users.name, users.email, users.role
        FROM sessions
        JOIN users ON users.id = sessions.user_id
        WHERE sessions.token = $1
        AND sessions.expires_at > NOW()
        `,
        [token]
    );

    const user = result.rows[0];

    if (!user || user.role !== "admin") return null;

    return user;
}

export async function GET() {
    try {
        const admin = await requireAdmin();

        if (!admin) {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }

        const usersResult = await pool.query(`
            SELECT id, name, email, role, created_at
            FROM users
            ORDER BY created_at DESC
        `);

        const emailsResult = await pool.query(`SELECT COUNT(*) FROM emails`);
        const repliesResult = await pool.query(`SELECT COUNT(*) FROM ai_replies`);
        const tasksResult = await pool.query(`SELECT COUNT(*) FROM tasks`);

        const users = usersResult.rows;

        return NextResponse.json({
            admin,
            stats: {
                totalUsers: users.length,
                admins: users.filter((user) => user.role === "admin").length,
                members: users.filter((user) => user.role !== "admin").length,
                emails: Number(emailsResult.rows[0].count),
                aiReplies: Number(repliesResult.rows[0].count),
                tasks: Number(tasksResult.rows[0].count),
            },
            users,
        });
    } catch (error) {
        console.error("Admin dashboard error:", error);

        return NextResponse.json(
            { error: "Failed to load admin dashboard" },
            { status: 500 }
        );
    }
}