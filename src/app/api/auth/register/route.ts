import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
    const body = await request.json();

    const passwordHash = await bcrypt.hash(body.password, 10);

    try {
        const result = await pool.query(
            `
      INSERT INTO users (name, email, password_hash)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
            [body.name, body.email, passwordHash]
        );

        const user = result.rows[0];

        await createSession(user.id);

        return NextResponse.json(user);
    } catch {
        return NextResponse.json(
            { error: "Email already exists" },
            { status: 400 }
        );
    }
}