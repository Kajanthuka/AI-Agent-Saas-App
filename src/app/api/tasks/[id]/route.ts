// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";

// type RouteParams = {
//     params: Promise<{
//         id: string;
//     }>;
// };

// export async function PATCH(request: Request, { params }: RouteParams) {
//     const { id } = await params;
//     const body = await request.json();

//     const result = await pool.query(
//         `
//     UPDATE tasks
//     SET status = $1
//     WHERE id = $2
//     RETURNING
//       id,
//       title,
//       source,
//       priority,
//       status,
//       created_at AS "createdAt"
//     `,
//         [body.status, id]
//     );

//     if (result.rows.length === 0) {
//         return NextResponse.json(
//             { error: "Task not found" },
//             { status: 404 }
//         );
//     }

//     return NextResponse.json(result.rows[0]);
// }

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

type RouteParams = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const result = await pool.query(
        `
        UPDATE tasks
        SET status = $1
        WHERE id = $2
          AND user_id = $3
        RETURNING
          id,
          title,
          source,
          priority,
          status,
          created_at AS "createdAt"
        `,
        [body.status, id, user.id]
    );

    if (result.rows.length === 0) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
}