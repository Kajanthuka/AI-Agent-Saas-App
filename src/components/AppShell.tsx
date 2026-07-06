"use client";

import { usePathname } from "next/navigation";
import TopNav from "@/components/navbar/TopNav";
import SideNav from "@/components/navbar/SideNav";
import Footer from "@/components/footer/Footer";
import AuthGuard from "@/components/AuthGuard";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isPublicPage =
        pathname === "/" ||
        pathname.startsWith("/auth/login") ||
        pathname.startsWith("/auth/register") ||
        pathname.startsWith("/privacy") ||
        pathname.startsWith("/terms");

    if (isPublicPage) {
        return <main className="min-h-screen bg-gray-50">{children}</main>;
    }

    return (
        <AuthGuard>
            <div className="min-h-screen bg-gray-50">
                <TopNav />

                <div className="flex pt-0">
                    <SideNav />
                    <main className="min-w-0 flex-1 p-6">{children}</main>
                </div>

                <Footer />
            </div>
        </AuthGuard>
    );
}