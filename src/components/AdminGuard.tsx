"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
        async function checkAdmin() {
            const response = await fetch("/api/auth/me", {
                cache: "no-store",
            });

            const data = await response.json();

            if (!data.user || data.user.role !== "admin") {
                // router.replace("/auth/admin/login");
                router.replace("/auth/admin/login");
                return;
            }

            setIsAllowed(true);
        }

        checkAdmin();
    }, [router]);

    if (!isAllowed) {
        return null;
    }

    return <>{children}</>;
}