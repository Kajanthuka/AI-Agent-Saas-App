import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { email, password, requiredRole } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const userResult = await pool.query(
            "SELECT id, name, email, password_hash, role FROM users WHERE email = $1",
            [email]
        );

        const user = userResult.rows[0];

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        if (requiredRole === "admin" && user.role !== "admin") {
            return NextResponse.json(
                { error: "Admin access only" },
                { status: 403 }
            );
        }

        const token = crypto.randomBytes(32).toString("hex");

        await pool.query(
            "INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')",
            [user.id, token]
        );

        const response = NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        response.cookies.set("session_token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            { error: "Login failed" },
            { status: 500 }
        );
    }
}