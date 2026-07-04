"use client";

import { Inbox, MailCheck, MailQuestion, MailWarning } from "lucide-react";
// import { useState } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";

type Email = {
    id: number;
    from: string;
    subject: string;
    preview: string;
    urgency: string;
    status: "Reviewed" | "Not checked";
};

export default function EmailPage() {

    const [emails, setEmails] = useState<Email[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadEmails() {
            const response = await fetch("/api/emails");
            const data = await response.json();

            setEmails(data);
            setIsLoading(false);
        }

        loadEmails();
    }, []);


    async function updateEmailStatus(id: number, status: "Reviewed" | "Not checked") {
        const response = await fetch(`/api/emails/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            return;
        }

        setEmails((currentEmails) =>
            currentEmails.map((email) =>
                email.id === id ? { ...email, status } : email
            )
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Email</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        View incoming emails and urgency levels.
                    </p>
                </div>

                <section className="grid gap-4 sm:grid-cols-4">
                    <EmailStatCard title="Total Emails" value={emails.length} icon={Inbox} />

                    <EmailStatCard
                        title="Urgent"
                        value={emails.filter((email) => email.urgency === "High").length}
                        icon={MailWarning}
                    />

                    <EmailStatCard
                        title="Reviewed"
                        value={emails.filter((email) => email.status === "Reviewed").length}
                        icon={MailCheck}
                    />

                    <EmailStatCard
                        title="Not checked"
                        value={emails.filter((email) => email.status === "Not checked").length}
                        icon={MailQuestion}
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-950">
                            Email Inbox
                        </h2>
                        <Inbox size={22} className="text-emerald-700" />
                    </div>

                    <div className="space-y-3">

                        {emails.map((email) => (
                            <article
                                key={email.id}
                                className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                            >

                                <Link
                                    key={email.id}
                                    href={`/email/${email.id}`}
                                    className="block rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                                >
                                    ...
                                </Link>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-950">
                                            {email.subject}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            From {email.from}
                                        </p>
                                    </div>

                                    <UrgencyBadge urgency={email.urgency} />
                                </div>
                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                                    {email.preview.slice(0, 300)}
                                    {email.preview.length > 300 ? "..." : ""}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateEmailStatus(email.id, "Reviewed")}
                                        className={`inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition ${email.status === "Reviewed"
                                            ? "bg-emerald-700 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        Reviewed
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => updateEmailStatus(email.id, "Not checked")}
                                        className={`inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition ${email.status === "Not checked"
                                            ? "bg-amber-500 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        Haven&apos;t checked
                                    </button>

                                    <span className="text-sm text-slate-500">
                                        Status: {email.status}
                                    </span>
                                </div>
                            </article>

                        ))}
                    </div>
                </section>
            </div >
        </main >
    );
}

type EmailStatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
};

function EmailStatCard({ title, value, icon: Icon }: EmailStatCardProps) {
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

function UrgencyBadge({ urgency }: { urgency: string }) {
    const className =
        urgency === "High"
            ? "bg-red-100 text-red-700"
            : urgency === "Medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700";

    return (
        <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {urgency}
        </span>
    );
}