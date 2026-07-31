"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
    Bot,
    Inbox,
    LayoutDashboard,
    ListChecks,
    Settings,
    ShieldCheck,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Admin", href: "/admin/dashboard", icon: ShieldCheck, adminOnly: true },
    { label: "Emails", href: "/email", icon: Inbox },
    { label: "Tasks", href: "/tasks", icon: ListChecks },
    { label: "AI Replies", href: "/replies", icon: Bot },
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function SideNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    useEffect(() => {
        async function loadCurrentUser() {
            try {
                const response = await fetch("/api/auth/me", {
                    cache: "no-store",
                });

                const data = await response.json();

                if (response.ok && data.user) {
                    setUserRole(data.user.role);
                }
            } catch (error) {
                console.error("Load current user error:", error);
            }
        }

        loadCurrentUser();
    }, []);


    const handleProtectedClick = async (
        event: React.MouseEvent<HTMLAnchorElement>
    ) => {
        event.preventDefault();

        const href = event.currentTarget.href;

        const response = await fetch("/api/auth/me", {
            cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok || !data.user) {
            window.location.href = "/auth/login";
            return;
        }

        setIsOpen(false);
        window.location.href = href;
    };
    return (
        <>
            <button
                aria-expanded={isOpen}
                aria-label="Open side navigation"
                className="fixed left-4 top-29 z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white shadow-lg lg:hidden"
                onClick={() => setIsOpen(true)}
                type="button"
            >
                <span className="h-0.5 w-5 rounded-full bg-slate-950" />
                <span className="h-0.5 w-5 rounded-full bg-slate-950" />
                <span className="h-0.5 w-5 rounded-full bg-slate-950" />
            </button>

            <div
                className={`fixed inset-0 z-[55] bg-slate-950/35 backdrop-blur-sm transition-opacity lg:hidden ${isOpen ? "opacity-100" : "pointer-events-none opacity-0 "
                    }`}
                onClick={() => setIsOpen(false)}
            />

            <aside
                className={`fixed left-0 top-0 z-[70] flex h-dvh w-[260px] flex-col bg-gradient-to-b from-emerald-800 to-emerald-900 px-3 py-4 text-white shadow-2xl transition-transform duration-300 lg:static lg:z-auto lg:h-[calc(100vh-5rem)] lg:w-[200px] lg:translate-x-0 lg:rounded-2xl lg:shadow-sm ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <span className="text-lg font-semibold text-white">Menu</span>

                    <button
                        aria-label="Close side navigation"
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-white lg:hidden"
                        onClick={() => setIsOpen(false)}
                        type="button"
                    >
                        x
                    </button>
                </div>

                <nav className="mt-1 space-y-3">
                    {navItems
                        .filter((item) => !item.adminOnly || userRole === "admin")
                        .map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex h-10 items-center gap-5 rounded-2xl px-4 text-lg font-medium transition ${isActive
                                    ? "bg-white/15 text-white shadow-lg shadow-indigo-950/40"
                                    : "text-white hover:bg-gray-200/20 hover:text-gray-200"
                                    }`}
                                onClick={handleProtectedClick}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}
