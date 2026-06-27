"use client";

import { Bot, CheckCircle2, Copy, RefreshCw, Send } from "lucide-react";
import { useEffect, useState } from "react";

type Reply = {
    id: number;
    title: string;
    recipient: string;
    source: string;
    preview: string;
    status: "Draft" | "Ready" | "Sent";
};
export default function RepliesPage() {
    const [replies, setReplies] = useState<Reply[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadReplies() {
            const response = await fetch("/api/replies");
            const data = await response.json();

            setReplies(data);
            setIsLoading(false);
        }

        loadReplies();
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
            const error = await response.json();
            alert(error.error ?? "AI is busy. Please try again.");
            return;
        }

        const updatedReply = await response.json();

        setReplies((currentReplies) =>
            currentReplies.map((reply) =>
                reply.id === id ? { ...reply, ...updatedReply, id: reply.id } : reply
            )
        );
    }

    async function updateReplyStatus(id: number, status: "Draft" | "Ready" | "Sent") {
        const response = await fetch(`/api/replies/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            return;
        }

        setReplies((currentReplies) =>
            currentReplies.map((reply) =>
                reply.id === id ? { ...reply, status } : reply
            )
        );
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
                <p className="text-sm text-slate-500">Loading replies...</p>
            </main>
        );
    }


    async function sendReply(id: number) {
        const response = await fetch(`/api/replies/${id}/send`, {
            method: "POST",
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.error ?? "Failed to send reply");
            return;
        }

        const updatedReply = await response.json();

        setReplies((currentReplies) =>
            currentReplies.map((reply) =>
                reply.id === id ? { ...reply, ...updatedReply, id: reply.id } : reply
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
                                        onClick={() => updateReplyStatus(reply.id, "Ready")}
                                        // onClick={() => markAsReady(reply.id)}
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
                                        onClick={() => sendReply(reply.id)}
                                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-700 px-3 text-sm font-medium text-white transition hover:bg-emerald-800"
                                    >
                                        <Send size={16} />
                                        Send reply
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