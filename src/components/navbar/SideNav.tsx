'use client'

import React from 'react'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import {
    Bot,
    Inbox,
    LayoutDashboard,
    ListChecks,
    Settings,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Emails", href: "/emails", icon: Inbox },
    { label: "Tasks", href: "/tasks", icon: ListChecks },
    { label: "AI Replies", href: "/replies", icon: Bot },
    { label: "Settings", href: "/settings", icon: Settings },
];

export default function SideNav() {
    const pathname = usePathname();
    return (
        <div className="min-h-0 bg-gray-50 px-2 py-1 lg:px-1">
            <aside className=" top-0 mx-1 mb-0 flex min-h-[calc(100vh-8rem)] w-[200px] shrink-0 flex-col rounded-2xl   bg-linear-to-b bg-emerald-800  px-2 py-1 text-slate-300 shadow-sm">
                <nav className="mt-1 space-y-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex h-10 items-center gap-5 rounded-2xl px-6 text transition ${isActive
                                    ? "text-gray-100 variant-light shadow-lg shadow-indigo-950/40"
                                    : "text-white text-lg hover:bg-gray-200/50 hover:text-gray-300"
                                    }`}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </div >

    )


}
