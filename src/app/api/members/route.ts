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

        const result = await pool.query(`
      SELECT id, name, email, role, status, created_at
      FROM members
      ORDER BY created_at DESC
    `);

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error("Get members error:", error);
        return NextResponse.json(
            { error: "Failed to load members" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const admin = await requireAdmin();

        if (!admin) {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }

        const { name, email, role } = await request.json();

        if (!name || !email) {
            return NextResponse.json(
                { error: "Name and email are required" },
                { status: 400 }
            );
        }

        const result = await pool.query(
            `
      INSERT INTO members (name, email, role, status)
      VALUES ($1, $2, $3, 'active')
      RETURNING id, name, email, role, status, created_at
      `,
            [name, email, role || "member"]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Create member error:", error);
        return NextResponse.json(
            { error: "Failed to create member" },
            { status: 500 }
        );
    }
}
