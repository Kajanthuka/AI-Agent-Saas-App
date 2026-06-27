"use client";

import TopNav from "@/components/navbar/TopNav";
import SideNav from "@/components/navbar/SideNav";
import Footer from "@/components/footer/Footer";
import AuthGuard from "@/components/AuthGuard";

export default function AppShell({ children }: { children: React.ReactNode }) {
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