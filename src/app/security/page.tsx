
import {
    Eye,
    KeyRound,
    Lock,
    MonitorSmartphone,
    Save,
    ShieldAlert,
    ShieldCheck,
    UserCheck,
} from "lucide-react";
import type { ElementType } from "react";

const sessions = [
    {
        id: 1,
        device: "Chrome on Windows",
        location: "London, UK",
        status: "Current session",
    },
    {
        id: 2,
        device: "Safari on iPhone",
        location: "Manchester, UK",
        status: "Active",
    },
];

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">
                        Security & Privacy
                    </h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage account protection, sessions, and privacy controls.
                    </p>
                </div>

                <section className="grid gap-4 sm:grid-cols-3">
                    <SecurityStatCard
                        title="Account Status"
                        value="Protected"
                        icon={ShieldCheck}
                    />

                    <SecurityStatCard
                        title="2FA"
                        value="Enabled"
                        icon={KeyRound}
                    />

                    <SecurityStatCard
                        title="Active Sessions"
                        value={sessions.length.toString()}
                        icon={MonitorSmartphone}
                    />
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <SecurityCard title="Password & Sign In" icon={Lock}>
                        <div className="space-y-4">
                            <SecurityInput
                                label="Current password"
                                type="password"
                                placeholder="Enter current password"
                            />

                            <SecurityInput
                                label="New password"
                                type="password"
                                placeholder="Enter new password"
                            />

                            <SecurityInput
                                label="Confirm new password"
                                type="password"
                                placeholder="Confirm new password"
                            />

                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                Update password
                            </button>
                        </div>
                    </SecurityCard>

                    <SecurityCard title="Two-Factor Authentication" icon={KeyRound}>
                        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                            <div className="flex items-start gap-3">
                                <ShieldCheck size={22} className="mt-0.5 text-emerald-700" />
                                <div>
                                    <p className="font-semibold text-emerald-950">
                                        Two-factor authentication is enabled
                                    </p>
                                    <p className="mt-1 text-sm leading-6 text-emerald-800">
                                        Your account requires a verification code when signing in
                                        from a new device.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                Manage 2FA
                            </button>

                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                Disable
                            </button>
                        </div>
                    </SecurityCard>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <SecurityCard title="Privacy Controls" icon={Eye}>
                        <div className="space-y-3">
                            <ToggleRow label="Allow AI to analyze email content" defaultChecked />
                            <ToggleRow label="Store generated reply history" defaultChecked />
                            <ToggleRow label="Use anonymized data to improve suggestions" />
                            <ToggleRow label="Show sender names in dashboard previews" defaultChecked />
                        </div>
                    </SecurityCard>

                    <SecurityCard title="Account Access" icon={UserCheck}>
                        <div className="space-y-3">
                            <ToggleRow label="Require login after 30 minutes inactive" defaultChecked />
                            <ToggleRow label="Email me about new sign-ins" defaultChecked />
                            <ToggleRow label="Restrict access to invited workspace members" defaultChecked />
                        </div>
                    </SecurityCard>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <MonitorSmartphone size={22} className="text-emerald-700" />
                            <h2 className="text-lg font-semibold text-slate-950">
                                Active Sessions
                            </h2>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center rounded-lg border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                            Sign out all
                        </button>
                    </div>

                    <div className="space-y-3">
                        {sessions.map((session) => (
                            <article
                                key={session.id}
                                className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-slate-950">
                                        {session.device}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {session.location}
                                    </p>
                                </div>

                                <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                    {session.status}
                                </span>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-3">
                            <ShieldAlert size={24} className="mt-0.5 text-red-700" />
                            <div>
                                <h2 className="text-lg font-semibold text-red-950">
                                    Danger Zone
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-red-700">
                                    Permanently delete your account, workspace data, emails, AI
                                    replies, and generated tasks.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                            Delete account
                        </button>
                    </div>
                </section>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                        <Save size={18} />
                        Save security settings
                    </button>
                </div>
            </div>
        </main>
    );
}

type SecurityStatCardProps = {
    title: string;
    value: string;
    icon: ElementType;
};

function SecurityStatCard({ title, value, icon: Icon }: SecurityStatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                <Icon size={22} className="text-emerald-700" />
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-950">{value}</p>
        </div>
    );
}

type SecurityCardProps = {
    title: string;
    icon: ElementType;
    children: React.ReactNode;
};

function SecurityCard({ title, icon: Icon, children }: SecurityCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
                <Icon size={22} className="text-emerald-700" />
                <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            </div>

            {children}
        </div>
    );
}

function SecurityInput({
    label,
    type,
    placeholder,
}: {
    label: string;
    type: string;
    placeholder: string;
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
                type={type}
                placeholder={placeholder}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
        </label>
    );
}

function ToggleRow({
    label,
    defaultChecked = false,
}: {
    label: string;
    defaultChecked?: boolean;
}) {
    return (
        <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-3 py-3">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
                type="checkbox"
                defaultChecked={defaultChecked}
                className="h-4 w-4 accent-emerald-700"
            />
        </label>
    );
}