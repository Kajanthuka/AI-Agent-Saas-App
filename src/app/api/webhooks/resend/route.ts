import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
    const event = await request.json();

    const messageId = event?.data?.email_id;
    const eventType = event?.type;

    if (!messageId || !eventType) {
        return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
    }

    const columnMap: Record<string, string> = {
        "email.delivered": "delivered_at",
        "email.opened": "opened_at",
        "email.clicked": "clicked_at",
        "email.bounced": "bounced_at",
        "email.complained": "complained_at",
        "email.unsubscribed": "unsubscribed_at",
    };

    const column = columnMap[eventType];

    if (!column) {
        return NextResponse.json({ received: true });
    }

    await pool.query(
        `
    UPDATE email_logs
    SET ${column} = NOW(), status = $1
    WHERE message_id = $2
    `,
        [eventType.replace("email.", ""), messageId]
    );

    return NextResponse.json({ received: true });
}