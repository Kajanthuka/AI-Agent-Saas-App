// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// import { useEffect, useMemo, useState } from "react";

// const protectedRoutes = [
//     "/dashboard",
//     "/email",
//     "/tasks",
//     "/replies",
//     "/members",
//     "/settings",
//     "/account",
//     "/preferences",
//     "/security",
//     "/feedback",
//     "/search",
// ];

// export default function AuthGuard({ children }: { children: React.ReactNode }) {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [allowedPath, setAllowedPath] = useState<string | null>(null);

//     const isProtectedRoute = useMemo(() => {
//         return protectedRoutes.some((route) => pathname.startsWith(route));
//     }, [pathname]);

//     useEffect(() => {
//         let cancelled = false;

//         async function checkAuth() {
//             if (!isProtectedRoute) {
//                 setAllowedPath(pathname);
//                 return;
//             }

//             setAllowedPath(null);

//             const response = await fetch("/api/auth/me", {
//                 cache: "no-store",
//             });

//             const data = await response.json();

//             if (!response.ok || !data.user) {
//                 const queryString = searchParams.toString();
//                 const currentPath = queryString ? `${pathname}?${queryString}` : pathname;

//                 router.replace(`/auth/login?next=${encodeURIComponent(currentPath)}`);
//                 return;
//             }

//             if (!cancelled) {
//                 setAllowedPath(pathname);
//             }
//         }

//         checkAuth();

//         return () => {
//             cancelled = true;
//         };
//     }, [pathname, searchParams, isProtectedRoute, router]);

//     if (isProtectedRoute && allowedPath !== pathname) {
//         return null;
//     }

//     return <>{children}</>;
// }
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
    "/admin",
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
                const currentPath =
                    typeof window !== "undefined"
                        ? `${window.location.pathname}${window.location.search}`
                        : pathname;

                router.replace(`/auth/login?next=${encodeURIComponent(currentPath)}`);
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