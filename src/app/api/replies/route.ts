import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    const result = await pool.query(`
    SELECT id, title, recipient, source, preview, status, created_at AS "createdAt"
    FROM ai_replies
    ORDER BY created_at DESC
  `);

    return NextResponse.json(result.rows);
}