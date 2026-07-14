import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
    const result = await pool.query(`
    SELECT
      COUNT(*)::int AS sent,
      COUNT(delivered_at)::int AS delivered,
      COUNT(opened_at)::int AS opened,
      COUNT(clicked_at)::int AS clicked,
      COUNT(bounced_at)::int AS bounced,
      COUNT(complained_at)::int AS complained,
      COUNT(unsubscribed_at)::int AS unsubscribed
    FROM email_logs
  `);

    const stats = result.rows[0];

    const sent = stats.sent || 0;
    const delivered = stats.delivered || 0;

    const percent = (value: number, total: number) => {
        if (!total) return 0;
        return Math.round((value / total) * 100);
    };

    return NextResponse.json({
        sent,
        delivered,
        opened: stats.opened,
        clicked: stats.clicked,
        bounced: stats.bounced,
        complained: stats.complained,
        unsubscribed: stats.unsubscribed,
        deliveryRate: percent(delivered, sent),
        openRate: percent(stats.opened, delivered),
        clickRate: percent(stats.clicked, delivered),
        bounceRate: percent(stats.bounced, sent),
        complaintRate: percent(stats.complained, delivered),
    });
}