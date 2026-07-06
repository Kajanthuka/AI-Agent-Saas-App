import { google } from "googleapis";
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { getGoogleOAuthClient } from "@/lib/google";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing Google code" }, { status: 400 });
    }

    const oauth2Client = getGoogleOAuthClient();
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
        version: "v2",
        auth: oauth2Client,
    });

    const userInfo = await oauth2.userinfo.get();

    await pool.query(
        `
    INSERT INTO connected_accounts
      (provider, email, access_token, refresh_token, expiry_date)
    VALUES ($1, $2, $3, $4, $5)
    `,
        [
            "google",
            userInfo.data.email,
            tokens.access_token,
            tokens.refresh_token,
            tokens.expiry_date,
        ]
    );



    const appUrl =
        process.env.NEXT_PUBLIC_APP_URL ||
        "https://taskpilot-ai-725285196821.europe-west2.run.app";

    const syncUrl = new URL("/api/gmail/sync", appUrl);


    let synced = 0;

    try {
        const syncResponse = await fetch(syncUrl, {
            method: "POST",
        });

        if (syncResponse.ok) {
            const syncData = await syncResponse.json();
            synced = syncData.synced ?? 0;
        }
    } catch (error) {
        console.error("Gmail sync after connect failed:", error);
    }

    const dashboardUrl = new URL("/dashboard", appUrl);

    dashboardUrl.searchParams.set("gmailConnected", "true");
    dashboardUrl.searchParams.set("synced", String(synced));

    return NextResponse.redirect(dashboardUrl);
}