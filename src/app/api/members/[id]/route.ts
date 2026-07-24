import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

type Params = {
    params: Promise<{ id: string }>;
};

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

export async function PATCH(request: Request, { params }: Params) {
    try {
        const admin = await requireAdmin();

        if (!admin) {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }

        const { id } = await params;
        const { name, email, role, status } = await request.json();

        const result = await pool.query(
            `
      UPDATE members
      SET name = COALESCE($1, name),
          email = COALESCE($2, email),
          role = COALESCE($3, role),
          status = COALESCE($4, status)
      WHERE id = $5
      RETURNING id, name, email, role, status, created_at
      `,
            [name, email, role, status, id]
        );

        if (result.rows.length === 0) {
            return NextResponse.json(
                { error: "Member not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error("Update member error:", error);
        return NextResponse.json(
            { error: "Failed to update member" },
            { status: 500 }
        );
    }
}

export async function DELETE(_request: Request, { params }: Params) {
    try {
        const admin = await requireAdmin();

        if (!admin) {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }

        const { id } = await params;

        await pool.query("DELETE FROM members WHERE id = $1", [id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete member error:", error);
        return NextResponse.json(
            { error: "Failed to delete member" },
            { status: 500 }
        );
    }
}
