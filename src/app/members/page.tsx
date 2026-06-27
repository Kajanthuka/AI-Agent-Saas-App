
import { MailPlus, ShieldCheck, UserCheck, Users } from "lucide-react";

const members = [
    {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "Owner",
        status: "Active",
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "michael@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 3,
        name: "Emma Wilson",
        email: "emma@example.com",
        role: "Member",
        status: "Invited",
    },
];

export default function MembersPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-950">Members</h1>
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

                    <MemberStatCard
                        title="Active"
                        value={members.filter((member) => member.status === "Active").length}
                        icon={UserCheck}
                    />

                    <MemberStatCard
                        title="Pending Invites"
                        value={members.filter((member) => member.status === "Invited").length}
                        icon={MailPlus}
                    />

                    <MemberStatCard
                        title="Admins"
                        value={
                            members.filter(
                                (member) => member.role === "Owner" || member.role === "Admin"
                            ).length
                        }
                        icon={ShieldCheck}
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-950">
                            Workspace Members
                        </h2>
                        <Users size={22} className="text-emerald-700" />
                    </div>

                    <div className="space-y-3">
                        {members.map((member) => (
                            <article
                                key={member.id}
                                className="flex flex-col gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-800">
                                        {member.name
                                            .split(" ")
                                            .map((part) => part[0])
                                            .join("")}
                                    </div>

                                    <div>
                                        <p className="font-semibold text-slate-950">{member.name}</p>
                                        <p className="mt-1 text-sm text-slate-500">{member.email}</p>
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
                                        className="inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
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
    const className =
        role === "Owner"
            ? "bg-purple-100 text-purple-700"
            : role === "Admin"
                ? "bg-blue-100 text-blue-700"
                : "bg-slate-100 text-slate-700";

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {role}
        </span>
    );
}

function StatusBadge({ status }: { status: string }) {
    const className =
        status === "Active"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-amber-100 text-amber-700";

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {status}
        </span>
    );
}