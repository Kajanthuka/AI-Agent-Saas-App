import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({
        preview: "This is a regenerated reply from the backend.",
        status: "Draft",
    });
}