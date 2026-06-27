"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
    const [allowedPath, setAllowedPath] = useState<string | null>(null);

    const isProtectedRoute = useMemo(() => {
        return protectedRoutes.some((route) => pathname.startsWith(route));
    }, [pathname]);

    useEffect(() => {
        let cancelled = false;

        async function checkAuth() {
            if (!isProtectedRoute) {
                setAllowedPath(pathname);
                return;
            }

            setAllowedPath(null);

            const response = await fetch("/api/auth/me", {
                cache: "no-store",
            });

            const data = await response.json();

            if (!response.ok || !data.user) {
                router.replace("/auth/login");
                return;
            }

            if (!cancelled) {
                setAllowedPath(pathname);
            }
        }

        checkAuth();

        return () => {
            cancelled = true;
        };
    }, [pathname, isProtectedRoute, router]);

    if (isProtectedRoute && allowedPath !== pathname) {
        return null;
    }

    return <>{children}</>;
}