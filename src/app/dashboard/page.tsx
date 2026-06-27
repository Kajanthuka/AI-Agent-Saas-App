
"use client";

import { Bot, Copy, Inbox, ListChecks, MailWarning, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Email = {
    id: number;
    from: string;
    subject: string;
    preview: string;
    urgency: string;
    status: string;
};

type Task = {
    id: number;
    title: string;
    source: string;
    priority: string;
    status: string;
};

type AiReply = {
    id: number;
    title: string;
    recipient: string;
    source: string;
    preview: string;
    status: string;
};

type Stats = {
    emails: number;
    aiReplies: number;
    tasks: number;
    urgent: number;
};

export default function DashboardPage() {
    const [emails, setEmails] = useState<Email[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [aiReplies, setAiReplies] = useState<AiReply[]>([]);
    const [stats, setStats] = useState<Stats>({
        emails: 0,
        aiReplies: 0,
        tasks: 0,
        urgent: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadDashboard() {
            const response = await fetch("/api/dashboard");
            const data = await response.json();

            setEmails(data.emails ?? []);
            setTasks(data.tasks ?? []);
            setAiReplies(data.aiReplies ?? []);
            setStats(
                data.stats ?? {
                    emails: 0,
                    aiReplies: 0,
                    tasks: 0,
                    urgent: 0,
                }
            );

            setIsLoading(false);
        }

        loadDashboard();
    }, []);

    async function copyReply(text: string) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    async function regenerateReply(id: number) {
        const response = await fetch(`/api/replies/${id}/regenerate`, {
            method: "POST",
        });

        if (!response.ok) {
            return;
        }

        const updatedReply = await response.json();

        setAiReplies((currentReplies) =>
            currentReplies.map((reply) =>
                reply.id === id ? { ...reply, ...updatedReply, id: reply.id } : reply
            )
        );
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
                <p className="text-sm text-slate-500">Loading dashboard...</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Track your emails, urgent messages, AI generated tasks, and replies.
                    </h1>
                </div>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardCard title="Emails" value={stats.emails} icon={Inbox} />
                    <DashboardCard title="AI Replies" value={stats.aiReplies} icon={Bot} />
                    <DashboardCard title="Tasks" value={stats.tasks} icon={ListChecks} />
                    <DashboardCard title="Urgent" value={stats.urgent} icon={MailWarning} />
                </section>

                <section className="space-y-6">
                    <a
                        href="/api/auth/google"
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white"
                    >
                        Connect Gmail
                    </a>

                    <DashboardPanel title="Emails" icon={Inbox} href="/email">
                        <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">
                            {emails.map((email, index) => (
                                <div
                                    key={email.id ?? `email-${index}`}
                                    className="grid gap-2 bg-white px-4 py-3 transition hover:bg-slate-50 md:grid-cols-[180px_1fr_auto] md:items-center"
                                >
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-950">
                                            {getSenderName(email.from)}
                                        </p>
                                        <p className="truncate text-xs text-slate-500">
                                            {email.from}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-slate-900">
                                            {email.subject}
                                        </p>
                                        <p className="truncate text-sm text-slate-500">
                                            {createEmailPreview(email.preview)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 md:justify-end">
                                        <UrgencyBadge urgency={email.urgency} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardPanel>

                    <DashboardPanel title="AI Generated Tasks" icon={ListChecks} href="/tasks">
                        <div className="space-y-3">
                            {tasks.map((task, index) => (
                                <div
                                    key={task.id ?? `task-${index}`}
                                    className="rounded-xl border border-slate-200 bg-white p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-slate-950">
                                                {task.title}
                                            </p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                Source: {task.source}
                                            </p>
                                        </div>

                                        <PriorityBadge priority={task.priority} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardPanel>

                    <DashboardPanel title="AI Suggested Replies" icon={Bot} href="/replies">
                        <div className="space-y-3">
                            {aiReplies.map((reply, index) => (
                                <div
                                    key={reply.id ?? `reply-${index}`}
                                    className="rounded-xl border border-slate-200 bg-white p-4"
                                >
                                    <p className="font-semibold text-slate-950">{reply.title}</p>

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {reply.preview}
                                    </p>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <button
                                            type="button"
                                            onClick={() => copyReply(reply.preview)}
                                            className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <Copy size={16} />
                                            Copy
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => regenerateReply(reply.id)}
                                            className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-700 px-3 text-sm font-medium text-white transition hover:bg-emerald-800"
                                        >
                                            <RefreshCw size={16} />
                                            Regenerate
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DashboardPanel>
                </section>
            </div>
        </main>
    );
}

type DashboardCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
};

function DashboardCard({ title, value, icon: Icon }: DashboardCardProps) {
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

type DashboardPanelProps = {
    title: string;
    href: string;
    icon: React.ElementType;
    children: React.ReactNode;
};

function DashboardPanel({
    title,
    href,
    icon: Icon,
    children,
}: DashboardPanelProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-950">{title}</h2>

                <div className="flex items-center gap-3">
                    <Icon size={22} className="text-emerald-700" />

                    <Link
                        href={href}
                        className="inline-flex h-9 items-center justify-center rounded-lg bg-emerald-700 px-4 text-sm font-medium text-white transition hover:bg-emerald-800"
                    >
                        View all
                    </Link>
                </div>
            </div>

            {children}
        </div>
    );
}

function getSenderName(value: string) {
    return value.replace(/<.*?>/g, "").replace(/"/g, "").trim();
}

function createEmailPreview(value: string) {
    const cleaned = value
        .replace(/â€Œ/g, "")
        .replace(/Â/g, "")
        .replace(/\s+/g, " ")
        .trim();

    return cleaned.length > 120 ? `${cleaned.slice(0, 120)}...` : cleaned;
}

function UrgencyBadge({ urgency }: { urgency: string }) {
    const className =
        urgency === "High"
            ? "bg-red-100 text-red-700"
            : urgency === "Medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700";

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {urgency}
        </span>
    );
}

function PriorityBadge({ priority }: { priority: string }) {
    const className =
        priority === "High"
            ? "bg-red-100 text-red-700"
            : priority === "Medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700";

    return (
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {priority}
        </span>
    );
}