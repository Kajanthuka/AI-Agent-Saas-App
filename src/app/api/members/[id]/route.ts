import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

type Params = {
    params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: Params) {
    try {
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