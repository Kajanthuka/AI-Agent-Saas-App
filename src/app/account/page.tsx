// import React from 'react'

// export default function AccountPage() {
//     return (
//         <main className="p-6">
//             <h1 className="text-2xl font-bold">Your Account</h1>
//             <p className="mt-2 text-gray-600">
//                 Manage your profile and account details here.
//             </p>
//         </main>
//     )
// }

import {
    Bell,
    Camera,
    Lock,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";

export default function AccountPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Account</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your profile and account details here.
                    </p>
                </div>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-800">
                                TP
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-slate-950">
                                    TaskPilot User
                                </h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    user@taskpilot.ai
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        >
                            <Camera size={18} />
                            Change photo
                        </button>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-5 flex items-center gap-2">
                            <User size={22} className="text-emerald-700" />
                            <h2 className="text-lg font-semibold text-slate-950">
                                Profile Details
                            </h2>
                        </div>

                        <form className="space-y-4">
                            <AccountField label="Full name" defaultValue="TaskPilot User" />
                            <AccountField label="Company" defaultValue="TaskPilot AI" />
                            <AccountField label="Role" defaultValue="Workspace owner" />

                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                Save changes
                            </button>
                        </form>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-5 flex items-center gap-2">
                            <Mail size={22} className="text-emerald-700" />
                            <h2 className="text-lg font-semibold text-slate-950">
                                Contact Details
                            </h2>
                        </div>

                        <form className="space-y-4">
                            <AccountField label="Email address" defaultValue="user@taskpilot.ai" />
                            <AccountField label="Phone number" defaultValue="+44 7000 000000" />
                            <AccountField label="Timezone" defaultValue="Europe/London" />

                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                Update contact
                            </button>
                        </form>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-3">
                    <AccountActionCard
                        title="Password"
                        description="Update your password and sign-in security."
                        icon={Lock}
                        buttonLabel="Change password"
                    />

                    <AccountActionCard
                        title="Notifications"
                        description="Control email alerts, task updates, and AI reply notices."
                        icon={Bell}
                        buttonLabel="Manage alerts"
                    />

                    <AccountActionCard
                        title="Security"
                        description="Review active sessions and account protection settings."
                        icon={ShieldCheck}
                        buttonLabel="View security"
                    />
                </section>
            </div>
        </main>
    );
}

type AccountFieldProps = {
    label: string;
    defaultValue: string;
};

function AccountField({ label, defaultValue }: AccountFieldProps) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
                defaultValue={defaultValue}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
        </label>
    );
}

type AccountActionCardProps = {
    title: string;
    description: string;
    icon: React.ElementType;
    buttonLabel: string;
};

function AccountActionCard({
    title,
    description,
    icon: Icon,
    buttonLabel,
}: AccountActionCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon size={22} />
            </div>

            <h3 className="font-semibold text-slate-950">{title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                {description}
            </p>

            <button
                type="button"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
                {buttonLabel}
            </button>
        </div>
    );
}
