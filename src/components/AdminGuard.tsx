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

            if (!response.ok || !data.user) {
                router.replace("/auth/login");
                return;
            }

            if (data.user.role !== "admin") {
                window.alert("Sorry, only admins can access this area.");
                router.replace("/dashboard");
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
