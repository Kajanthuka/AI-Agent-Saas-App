'use client';

import { Bot, Copy, RefreshCw, Inbox, ListChecks, MailWarning } from "lucide-react";
// import { useState } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";



// const initialAiReplies = [
//     {
//         id: 1,
//         title: "Reply to Sarah Johnson",
//         preview:
//             "Hi Sarah, yes, we are confirmed for today. I will send over the meeting link shortly.",
//     },
//     {
//         id: 2,
//         title: "Reply to Michael Chen",
//         preview:
//             "Hi Michael, thanks for flagging this. I will review the invoice and get back to you with an update.",
//     },
// ];

// const regeneratedReplies = [
//     "Thanks for reaching out. I will review this and get back to you shortly with the next steps.",
//     "Hi, I appreciate the update. I will check the details and follow up as soon as possible.",
//     "Thanks for your message. I will handle this today and send you an update once complete.",
// ];

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

    // const emails = [
    //     {
    //         id: 1,
    //         from: "Sarah Johnson",
    //         subject: "Client onboarding call needs confirmation",
    //         preview: "Can you confirm if we are still good for the onboarding call today?",
    //         urgency: "High",
    //     },
    //     {
    //         id: 2,
    //         from: "Michael Chen",
    //         subject: "Invoice question",
    //         preview: "I noticed a difference in the latest invoice total. Could you check it?",
    //         urgency: "Medium",
    //     },
    //     {
    //         id: 3,
    //         from: "Emma Wilson",
    //         subject: "Weekly update",
    //         preview: "Here is the weekly progress update for the automation project.",
    //         urgency: "Low",
    //     },
    // ];

    const [emails, setEmails] = useState<Email[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [aiReplies, setAiReplies] = useState<AiReply[]>([]);

    // const tasks = [
    //     {
    //         id: 1,
    //         title: "Send onboarding meeting link",
    //         source: "Sarah Johnson email",
    //         priority: "High",
    //     },
    //     {
    //         id: 2,
    //         title: "Review invoice total",
    //         source: "Michael Chen email",
    //         priority: "Medium",
    //     },
    //     {
    //         id: 3,
    //         title: "Summarize weekly project update",
    //         source: "Emma Wilson email",
    //         priority: "Low",
    //     },
    // ];
    // const [aiReplies, setAiReplies] = useState(initialAiReplies);


    // const stats = {
    //     emails: emails.length,
    //     aiReplies: aiReplies.length,
    //     tasks: tasks.length,
    //     urgent: emails.filter((email) => email.urgency === "High").length,
    // };
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
        textArea.style.position = "fixed"
            ;
        textArea.style.left = "-9999px";
        textArea.style.top = "-9999px";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    // function regenerateReply(id: number) {
    //     setAiReplies((currentReplies) =>
    //         currentReplies.map((reply) => {
    //             if (reply.id !== id) {
    //                 return reply;
    //             }

    //             const randomReply =
    //                 regeneratedReplies[
    //                 Math.floor(Math.random() * regeneratedReplies.length)
    //                 ];

    //             return {
    //                 ...reply,
    //                 preview: randomReply,
    //             };
    //         })
    //     );
    // }

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
                reply.id === id ? updatedReply : reply
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
                        Track your Emails, Urgent Messages,  AI generated Tasks and Replies.
                    </h1>
                </div>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <DashboardCard title="Emails" value={stats.emails} icon={Inbox} />
                    <DashboardCard title="AI Replies" value={stats.aiReplies} icon={Bot} />
                    <DashboardCard title="Tasks" value={stats.tasks} icon={ListChecks} />
                    <DashboardCard title="Urgent" value={stats.urgent} icon={MailWarning} />
                </section>

                <section className="space-y-6">
                    <DashboardPanel title="Emails" icon={Inbox} href="/email">
                        <div className="space-y-3">
                            {emails.map((email) => (
                                <div
                                    key={email.id}
                                    className="rounded-xl border border-slate-200 bg-white p-4"
                                >
                                    <div className="flex items-start justify-between gap-3">
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

                                    <p className="mt-3 text-sm leading-6 text-slate-600">
                                        {email.preview}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </DashboardPanel>


                    <DashboardPanel title="AI Generated Tasks" icon={ListChecks} href="/tasks" >
                        <div className="space-y-3">
                            {tasks.map((task) => (
                                <div
                                    key={task.id}
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
                            {aiReplies.map((reply) => (
                                <div
                                    key={reply.id}
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
    icon: ElementType;
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
                <div>
                    <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
                </div>

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


