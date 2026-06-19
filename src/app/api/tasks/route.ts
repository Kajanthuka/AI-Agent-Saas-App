import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    const result = await pool.query(`
    SELECT id, title, source, priority, status, created_at AS "createdAt"
    FROM tasks
    ORDER BY created_at DESC
  `);

    return NextResponse.json(result.rows);
}