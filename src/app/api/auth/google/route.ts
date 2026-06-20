import { NextResponse } from "next/server";
import { getGoogleOAuthClient, gmailScopes } from "@/lib/google";

export async function GET() {
    const oauth2Client = getGoogleOAuthClient();

    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: gmailScopes,
    });

    return NextResponse.redirect(url);
}