import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { pool } from "@/lib/db";
import { createSession } from "@/lib/auth";

export async function POST(request: Request) {
    const body = await request.json();

    const result = await pool.query(
        `
    SELECT id, name, email, password_hash
    FROM users
    WHERE email = $1
    LIMIT 1
    `,
        [body.email]
    );

    const user = result.rows[0];

    if (!user) {
        return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const isValid = await bcrypt.compare(body.password, user.password_hash);

    if (!isValid) {
        return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    await createSession(user.id);

    return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
    });
}