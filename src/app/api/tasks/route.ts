// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";

// export async function GET() {
//     const result = await pool.query(`
//     SELECT id, title, source, priority, status, created_at AS "createdAt"
//     FROM tasks
//     ORDER BY created_at DESC
//   `);

//     return NextResponse.json(result.rows);
// }

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await pool.query(
    `
        SELECT
          id,
          title,
          source,
          priority,
          status,
          created_at AS "createdAt"
        FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
    [user.id]
  );

  return NextResponse.json(result.rows);
}