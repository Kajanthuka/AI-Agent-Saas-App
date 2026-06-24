import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { pool } from "@/lib/db";

export async function createSession(userId: number) {
    const token = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await pool.query(
        `
    INSERT INTO sessions (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    `,
        [userId, token, expiresAt]
    );

    const cookieStore = await cookies();

    cookieStore.set("session_token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        expires: expiresAt,
    });
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (!token) {
        return null;
    }

    const result = await pool.query(
        `
    SELECT users.id, users.name, users.email
    FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.token = $1
      AND sessions.expires_at > NOW()
    LIMIT 1
    `,
        [token]
    );

    return result.rows[0] ?? null;
}

export async function clearSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;

    if (token) {
        await pool.query("DELETE FROM sessions WHERE token = $1", [token]);
    }

    cookieStore.delete("session_token");
}