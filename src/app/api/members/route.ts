import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    try {
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