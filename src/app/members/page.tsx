"use client";

import { useEffect, useState } from "react";
import { MailPlus, ShieldCheck, UserCheck, Users } from "lucide-react";

type Member = {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    created_at: string;
};

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadMembers() {
            try {
                const response = await fetch("/api/members", {
                    cache: "no-store",
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.error ?? "Failed to load members");
                    return;
                }

                setMembers(data);
            } catch (error) {
                console.error("Load members error:", error);
                alert("Failed to load members");
            } finally {
                setIsLoading(false);
            }
        }

        loadMembers();
    }, []);

    async function removeMember(id: number) {
        const confirmed = window.confirm("Remove this member?");
        if (!confirmed) return;

        const response = await fetch(`/api/members/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.error ?? "Failed to remove member");
            return;
        }

        setMembers((currentMembers) =>
            currentMembers.filter((member) => member.id !== id)
        );
    }

    const activeMembers = members.filter(
        (member) => member.status.toLowerCase() === "active"
    ).length;

    const pendingInvites = members.filter((member) => {
        const status = member.status.toLowerCase();
        return status === "pending" || status === "invited";
    }).length;

    const admins = members.filter((member) => {
        const role = member.role.toLowerCase();
        return role === "owner" || role === "admin";
    }).length;

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-950">
                            Members
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage workspace members, roles, and invitations.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                        <MailPlus size={18} />
                        Invite member
                    </button>
                </div>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <MemberStatCard title="Total Members" value={members.length} icon={Users} />
                    <MemberStatCard title="Active" value={activeMembers} icon={UserCheck} />
                    <MemberStatCard title="Pending Invites" value={pendingInvites} icon={MailPlus} />
                    <MemberStatCard title="Admins" value={admins} icon={ShieldCheck} />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-950">
                            Workspace Members
                        </h2>
                        <Users size={22} className="text-emerald-700" />
                    </div>

                    {isLoading ? (
                        <p className="text-sm text-slate-500">Loading members...</p>
                    ) : members.length === 0 ? (
                        <p className="text-sm text-slate-500">No members found.</p>
                    ) : (
                        <div className="space-y-3">
                            {members.map((member) => (
                                <article
                                    key={member.id}
                                    className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                                            {getInitials(member.name)}
                                        </div>

                                        <div>
                                            <p className="font-semibold text-slate-950">
                                                {member.name}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2">
                                        <RoleBadge role={member.role} />
                                        <StatusBadge status={member.status} />

                                        <button
                                            type="button"
                                            className="inline-flex h-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Manage
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => removeMember(member.id)}
                                            className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

type MemberStatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
};

function MemberStatCard({ title, value, icon: Icon }: MemberStatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <Icon size={22} className="text-emerald-700" />
            </div>

            <p className="mt-4 text-3xl font-bold text-slate-950">{value}</p>
        </div>
    );
}

function RoleBadge({ role }: { role: string }) {
    const normalizedRole = role.toLowerCase();

    const className =
        normalizedRole === "owner"
            ? "bg-purple-100 text-purple-700"
            : normalizedRole === "admin"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-700";

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${className}`}>
            {role}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const normalizedStatus = status.toLowerCase();

    const className =
        normalizedStatus === "active"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700";

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${className}`}>
            {status}
        </span>
    );
}