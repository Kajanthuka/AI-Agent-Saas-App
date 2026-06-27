import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
    "/",
    "/dashboard",
    "/email",
    "/tasks",
    "/replies",
    "/members",
    "/settings",
    "/account",
    "/preferences",
    "/security",
    "/feedback",
    "/search",
];

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = request.cookies.get("session_token")?.value;

    const isProtectedRoute = protectedRoutes.some((route) => {
        if (route === "/") return pathname === "/";
        return pathname.startsWith(route);
    });

    if (isProtectedRoute && !sessionToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/dashboard/:path*",
        "/email/:path*",
        "/tasks/:path*",
        "/replies/:path*",
        "/members/:path*",
        "/settings/:path*",
        "/account/:path*",
        "/preferences/:path*",
        "/security/:path*",
        "/feedback/:path*",
        "/search/:path*",
    ],
};