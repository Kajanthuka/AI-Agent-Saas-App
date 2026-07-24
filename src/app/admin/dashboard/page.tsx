// "use client";

// import AdminGuard from "@/components/AdminGuard";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//     Bot,
//     Inbox,
//     LayoutDashboard,
//     ListChecks,
//     Settings,
//     ShieldCheck,
//     Users,
// } from "lucide-react";

// type AdminDashboardData = {
//     admin: {
//         id: number;
//         name: string;
//         email: string;
//         role: string;
//     };
//     stats: {
//         totalUsers: number;
//         admins: number;
//         members: number;
//         emails: number;
//         aiReplies: number;
//         tasks: number;
//     };
//     users: {
//         id: number;
//         name: string;
//         email: string;
//         role: string;
//         created_at: string;
//     }[];
// };

// export default function AdminDashboardPage() {
//     const [data, setData] = useState<AdminDashboardData | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     // useEffect(() => {
//     //     async function loadAdminDashboard() {
//     //         const response = await fetch("/api/admin/dashboard", {
//     //             cache: "no-store",
//     //         });

//     //         const result = await response.json();

//     //         if (response.ok) {
//     //             setData(result);
//     //         }

//     //         setIsLoading(false);
//     //     }

//     //     loadAdminDashboard();
//     // }, []);

//     useEffect(() => {
//         async function loadAdminDashboard() {
//             try {
//                 const response = await fetch("/api/auth/admin/dashboard", {
//                     cache: "no-store",
//                 });

//                 const result = await response.json();

//                 if (response.ok) {
//                     setData(result);
//                 }
//             } catch (error) {
//                 console.error("Failed to load admin dashboard:", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         }

//         loadAdminDashboard();
//     }, []);
//     return (
//         <AdminGuard>
//             <main className="min-h-[calc(100vh-120px)] bg-slate-50 px-6 py-8">
//                 <div className="mx-auto max-w-7xl space-y-8">
//                     <section>
//                         <p className="text-sm font-semibold uppercase text-emerald-700">
//                             Admin Area
//                         </p>
//                         <h1 className="mt-2 text-3xl font-bold text-slate-950">
//                             Admin Dashboard
//                         </h1>
//                         <p className="mt-2 text-slate-600">
//                             Manage users, app access, emails, AI replies, and tasks.
//                         </p>
//                     </section>

//                     {isLoading ? (
//                         <p className="text-slate-500">Loading admin dashboard...</p>
//                     ) : data ? (
//                         <>
//                             <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//                                 <AdminStat title="Total Users" value={data.stats.totalUsers} icon={Users} />
//                                 <AdminStat title="Admins" value={data.stats.admins} icon={ShieldCheck} />
//                                 <AdminStat title="Emails" value={data.stats.emails} icon={Inbox} />
//                                 <AdminStat title="AI Replies" value={data.stats.aiReplies} icon={Bot} />
//                             </section>

//                             <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//                                 <AdminLink href="/dashboard" title="User Dashboard" icon={LayoutDashboard} />
//                                 <AdminLink href="/members" title="Members" icon={Users} />
//                                 <AdminLink href="/settings" title="Settings" icon={Settings} />
//                                 <AdminLink href="/tasks" title="Tasks" icon={ListChecks} />
//                             </section>

//                             <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//                                 <h2 className="text-xl font-bold text-slate-950">
//                                     Registered Users
//                                 </h2>

//                                 <div className="mt-5 space-y-3">
//                                     {data.users.map((user) => (
//                                         <div
//                                             key={user.id}
//                                             className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
//                                         >
//                                             <div>
//                                                 <p className="font-semibold text-slate-950">
//                                                     {user.name}
//                                                 </p>
//                                                 <p className="text-sm text-slate-500">
//                                                     {user.email}
//                                                 </p>
//                                             </div>

//                                             <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
//                                                 {user.role}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         </>
//                     ) : (
//                         <p className="text-red-600">Could not load admin dashboard.</p>
//                     )}
//                 </div>
//             </main>
//         </AdminGuard>
//     );
// }

// function AdminStat({
//     title,
//     value,
//     icon: Icon,
// }: {
//     title: string;
//     value: number;
//     icon: React.ElementType;
// }) {
//     return (
//         <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//             <div className="flex items-start justify-between">
//                 <div>
//                     <p className="text-sm font-semibold text-slate-500">{title}</p>
//                     <p className="mt-5 text-4xl font-bold text-slate-950">{value}</p>
//                 </div>

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                     <Icon size={24} />
//                 </div>
//             </div>
//         </article>
//     );
// }

// function AdminLink({
//     href,
//     title,
//     icon: Icon,
// }: {
//     href: string;
//     title: string;
//     icon: React.ElementType;
// }) {
//     return (
//         <Link
//             href={href}
//             className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
//         >
//             <Icon className="text-emerald-700" size={24} />
//             {title}
//         </Link>
//     );
// }

"use client";

import AdminGuard from "@/components/AdminGuard";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
    Bot,
    CalendarDays,
    Inbox,
    LayoutDashboard,
    ListChecks,
    RefreshCw,
    Settings,
    ShieldCheck,
    Users,
} from "lucide-react";

type AdminDashboardData = {
    admin: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    stats: {
        totalUsers: number;
        admins: number;
        members: number;
        emails: number;
        aiReplies: number;
        tasks: number;
    };
    users: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
    }[];
};

export default function AdminDashboardPage() {
    const [data, setData] = useState<AdminDashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadAdminDashboard() {
        setIsLoading(true);
        setError("");

        try {
            const response = await
                fetch("/api/auth/admin/dashboard", {
                    cache: "no-store",
                });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.error || "Could not load admin dashboard.");
            }

            setData(result);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while loading the dashboard."
            );
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loadAdminDashboard();
    }, []);

    return (
        <AdminGuard>
            <main className="min-h-[calc(100vh-120px)] bg-slate-50 px-6 py-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase text-emerald-700">
                                Admin Area
                            </p>
                            <h1 className="mt-2 text-3xl font-bold text-slate-950">
                                Admin Dashboard
                            </h1>
                            <p className="mt-2 text-slate-600">
                                Manage users, app access, emails, AI replies, and tasks.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={loadAdminDashboard}
                            disabled={isLoading}
                            className="inline-flex w-fit items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                            Refresh
                        </button>
                    </section>

                    {isLoading ? (
                        <DashboardLoading />
                    ) : error ? (
                        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                            <p className="font-semibold">Could not load admin dashboard.</p>
                            <p className="mt-1 text-sm">{error}</p>
                        </section>
                    ) : data ? (
                        <>
                            <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                <AdminStat
                                    title="Total Users"
                                    value={data.stats.totalUsers}
                                    icon={Users}
                                />
                                <AdminStat
                                    title="Admins"
                                    value={data.stats.admins}
                                    icon={ShieldCheck}
                                />
                                <AdminStat
                                    title="Members"
                                    value={data.stats.members}
                                    icon={Users}
                                />
                                <AdminStat
                                    title="Emails"
                                    value={data.stats.emails}
                                    icon={Inbox}
                                />
                                <AdminStat
                                    title="AI Replies"
                                    value={data.stats.aiReplies}
                                    icon={Bot}
                                />
                                <AdminStat
                                    title="Tasks"
                                    value={data.stats.tasks}
                                    icon={ListChecks}
                                />
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-950">
                                            Current Admin
                                        </h2>
                                        <p className="text-sm text-slate-500">
                                            Signed-in administrator details
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    <InfoItem label="Name" value={data.admin.name} />
                                    <InfoItem label="Email" value={data.admin.email} />
                                    <InfoItem label="Role" value={data.admin.role} />
                                    <InfoItem label="Admin ID" value={String(data.admin.id)} />
                                </div>
                            </section>

                            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                <AdminLink
                                    href="/dashboard"
                                    title="User Dashboard"
                                    icon={LayoutDashboard}
                                />
                                <AdminLink href="/members" title="Members" icon={Users} />
                                <AdminLink href="/settings" title="Settings" icon={Settings} />
                                <AdminLink href="/tasks" title="Tasks" icon={ListChecks} />
                            </section>

                            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-950">
                                            Registered Users
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-500">
                                            Latest users with their roles and signup dates.
                                        </p>
                                    </div>

                                    <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                                        {data.users.length} users
                                    </span>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {data.users.length > 0 ? (
                                        data.users.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/40 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                <div>
                                                    <p className="font-semibold text-slate-950">
                                                        {user.name || "Unnamed User"}
                                                    </p>
                                                    <p className="text-sm text-slate-500">{user.email}</p>

                                                    <div className="mt-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                                                        <CalendarDays size={14} />
                                                        Joined {formatDate(user.created_at)}
                                                    </div>
                                                </div>

                                                <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
                                                    {user.role}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                                            <p className="font-semibold text-slate-700">
                                                No users found.
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Registered users will appear here.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </>
                    ) : (
                        <section className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                            Could not load admin dashboard.
                        </section>
                    )}
                </div>
            </main>
        </AdminGuard>
    );
}

function AdminStat({
    title,
    value,
    icon: Icon,
}: {
    title: string;
    value: number;
    icon: React.ElementType;
}) {
    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500">{title}</p>
                    <p className="mt-5 text-4xl font-bold text-slate-950">{value}</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Icon size={24} />
                </div>
            </div>
        </article>
    );
}

function AdminLink({
    href,
    title,
    icon: Icon,
}: {
    href: string;
    title: string;
    icon: React.ElementType;
}) {
    return (
        <Link
            href={href}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
        >
            <Icon className="text-emerald-700" size={24} />
            {title}
        </Link>
    );
}

function InfoItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">{label}</p>
            <p className="mt-2 break-words font-semibold capitalize text-slate-950">
                {value}
            </p>
        </div>
    );
}

function DashboardLoading() {
    return (
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                    key={item}
                    className="h-36 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="h-4 w-24 rounded bg-slate-200" />
                    <div className="mt-8 h-9 w-16 rounded bg-slate-200" />
                </div>
            ))}
        </section>
    );
}

function formatDate(date: string) {
    if (!date) {
        return "Unknown";
    }

    return new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(new Date(date));
}