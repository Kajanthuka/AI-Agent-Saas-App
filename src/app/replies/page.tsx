// import React from 'react'

// export default function AiRepliesPage() {
//     return (
//         <div>AiRepliesPage</div>
//     )
// }

"use client";

import { Bot, CheckCircle2, Copy, RefreshCw, Send } from "lucide-react";
import { useState } from "react";

const initialReplies = [
    {
        id: 1,
        title: "Reply to Sarah Johnson",
        recipient: "Sarah Johnson",
        source: "Client onboarding call needs confirmation",
        preview:
            "Hi Sarah, yes, we are confirmed for today. I will send over the meeting link shortly.",
        status: "Draft",
    },
    {
        id: 2,
        title: "Reply to Michael Chen",
        recipient: "Michael Chen",
        source: "Invoice question",
        preview:
            "Hi Michael, thanks for flagging this. I will review the invoice and get back to you with an update.",
        status: "Draft",
    },
    {
        id: 3,
        title: "Reply to Emma Wilson",
        recipient: "Emma Wilson",
        source: "Weekly update",
        preview:
            "Hi Emma, thanks for the weekly update. I will review the details and follow up if anything needs action.",
        status: "Draft",
    },
];

const regeneratedReplies = [
    "Thanks for reaching out. I will review this and get back to you shortly with the next steps.",
    "Hi, I appreciate the update. I will check the details and follow up as soon as possible.",
    "Thanks for your message. I will handle this today and send you an update once complete.",
];

export default function RepliesPage() {
    const [replies, setReplies] = useState(initialReplies);

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

    function regenerateReply(id: number) {
        setReplies((currentReplies) =>
            currentReplies.map((reply) => {
                if (reply.id !== id) {
                    return reply;
                }

                const randomReply =
                    regeneratedReplies[
                    Math.floor(Math.random() * regeneratedReplies.length)
                    ];

                return {
                    ...reply,
                    preview: randomReply,
                    status: "Draft",
                };
            })
        );
    }

    function markAsReady(id: number) {
        setReplies((currentReplies) =>
            currentReplies.map((reply) =>
                reply.id === id ? { ...reply, status: "Ready" } : reply
            )
        );
    }

    function markAsSent(id: number) {
        setReplies((currentReplies) =>
            currentReplies.map((reply) =>
                reply.id === id ? { ...reply, status: "Sent" } : reply
            )
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">AI Replies</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Review, regenerate, copy, and send AI suggested replies.
                    </p>
                </div>

                <section className="grid gap-4 sm:grid-cols-3">
                    <ReplyStatCard title="Total Replies" value={replies.length} icon={Bot} />

                    <ReplyStatCard
                        title="Ready"
                        value={replies.filter((reply) => reply.status === "Ready").length}
                        icon={CheckCircle2}
                    />

                    <ReplyStatCard
                        title="Sent"
                        value={replies.filter((reply) => reply.status === "Sent").length}
                        icon={Send}
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-950">
                            Suggested Replies
                        </h2>
                        <Bot size={22} className="text-emerald-700" />
                    </div>

                    <div className="space-y-3">
                        {replies.map((reply) => (
                            <article
                                key={reply.id}
                                className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-950">
                                            {reply.title}
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            To {reply.recipient} · Source: {reply.source}
                                        </p>
                                    </div>

                                    <ReplyStatusBadge status={reply.status} />
                                </div>

                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {reply.preview}
                                </p>

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => copyReply(reply.preview)}
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                    >
                                        <Copy size={16} />
                                        Copy
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => regenerateReply(reply.id)}
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                    >
                                        <RefreshCw size={16} />
                                        Regenerate
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => markAsReady(reply.id)}
                                        className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${reply.status === "Ready"
                                                ? "bg-emerald-700 text-white"
                                                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <CheckCircle2 size={16} />
                                        Ready
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => markAsSent(reply.id)}
                                        className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${reply.status === "Sent"
                                                ? "bg-emerald-700 text-white"
                                                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <Send size={16} />
                                        Sent
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

type ReplyStatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
};

function ReplyStatCard({ title, value, icon: Icon }: ReplyStatCardProps) {
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

function ReplyStatusBadge({ status }: { status: string }) {
    const className =
        status === "Sent"
            ? "bg-emerald-100 text-emerald-700"
            : status === "Ready"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700";

    return (
        <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {status}
        </span>
    );
}