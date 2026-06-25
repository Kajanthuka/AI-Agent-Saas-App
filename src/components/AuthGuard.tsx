"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const protectedRoutes = [
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

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        async function checkAuth() {
            const isProtectedRoute = protectedRoutes.some((route) =>
                pathname.startsWith(route)
            );

            if (!isProtectedRoute) {
                setChecking(false);
                return;
            }

            const response = await fetch("/api/auth/me", {
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok || !data.user) {
                router.replace("/auth/login");
                return;
            }

            setChecking(false);
        }

        checkAuth();
    }, [pathname, router]);

    if (checking) {
        return null;
    }

    return <>{children}</>;
}