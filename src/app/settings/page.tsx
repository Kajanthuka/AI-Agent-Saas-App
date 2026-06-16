// import React from 'react'

// export default function SettingsPage() {
//     return (
//         <div>Settings Page</div>
//     )
// }
import {
    Bell,
    Bot,
    CreditCard,
    Lock,
    Mail,
    Save,
    ShieldCheck,
    SlidersHorizontal,
    User,
} from "lucide-react";
import type { ElementType } from "react";

export default function SettingsPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Settings</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your workspace, account, notifications, and AI preferences.
                    </p>
                </div>

                <section className="grid gap-6 xl:grid-cols-2">
                    <SettingsCard title="Profile Settings" icon={User}>
                        <div className="space-y-4">
                            <SettingsInput label="Full name" defaultValue="TaskPilot User" />
                            <SettingsInput label="Email address" defaultValue="user@taskpilot.ai" />
                            <SettingsInput label="Company" defaultValue="TaskPilot AI" />
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Email Settings" icon={Mail}>
                        <div className="space-y-3">
                            <ToggleRow label="Prioritize urgent emails" defaultChecked />
                            <ToggleRow label="Group emails by sender" defaultChecked />
                            <ToggleRow label="Show unread emails first" />
                        </div>
                    </SettingsCard>

                    <SettingsCard title="AI Settings" icon={Bot}>
                        <div className="space-y-3">
                            <ToggleRow label="Auto-generate AI replies" defaultChecked />
                            <ToggleRow label="Create tasks from urgent emails" defaultChecked />
                            <ToggleRow label="Suggest shorter replies" />
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Notifications" icon={Bell}>
                        <div className="space-y-3">
                            <ToggleRow label="New email alerts" defaultChecked />
                            <ToggleRow label="Task reminder alerts" defaultChecked />
                            <ToggleRow label="AI reply ready alerts" />
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Security" icon={ShieldCheck}>
                        <div className="space-y-4">
                            <SettingsInput label="Current password" defaultValue="" type="password" />
                            <SettingsInput label="New password" defaultValue="" type="password" />

                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                            >
                                <Lock size={17} />
                                Update password
                            </button>
                        </div>
                    </SettingsCard>

                    <SettingsCard title="Billing" icon={CreditCard}>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <p className="text-sm font-semibold text-slate-950">Current plan</p>
                            <p className="mt-1 text-sm text-slate-500">Starter workspace</p>

                            <button
                                type="button"
                                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                Manage billing
                            </button>
                        </div>
                    </SettingsCard>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                        <SlidersHorizontal size={22} className="text-emerald-700" />
                        <h2 className="text-lg font-semibold text-slate-950">
                            App Preferences
                        </h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                        <SettingsSelect
                            label="Theme"
                            options={["Light", "Dark", "System"]}
                        />

                        <SettingsSelect
                            label="Timezone"
                            options={["Europe/London", "UTC", "America/New_York"]}
                        />

                        <SettingsSelect
                            label="Reply tone"
                            options={["Professional", "Friendly", "Short"]}
                        />
                    </div>
                </section>

                <div className="flex justify-end">
                    <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                        <Save size={18} />
                        Save settings
                    </button>
                </div>
            </div>
        </main>
    );
}

type SettingsCardProps = {
    title: string;
    icon: ElementType;
    children: React.ReactNode;
};

function SettingsCard({ title, icon: Icon, children }: SettingsCardProps) {
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

type SettingsInputProps = {
    label: string;
    defaultValue: string;
    type?: string;
};

function SettingsInput({
    label,
    defaultValue,
    type = "text",
}: SettingsInputProps) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
                type={type}
                defaultValue={defaultValue}
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

function SettingsSelect({
    label,
    options,
}: {
    label: string;
    options: string[];
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <select className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                {options.map((option) => (
                    <option key={option}>{option}</option>
                ))}
            </select>
        </label>
    );
}