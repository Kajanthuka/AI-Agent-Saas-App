"use client";

import Link from "next/link";
import {
    ArrowLeft,
    Bot,
    CheckCircle2,
    Copy,
    Inbox,
    ListChecks,
    RefreshCw,
} from "lucide-react";
import { useEffect, useState } from "react";

type EmailDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

type EmailDetail = {
    id: number;
    from: string;
    subject: string;
    preview: string;
    urgency: string;
    status: "Reviewed" | "Not checked";
    aiReply: {
        id: number;
        preview: string;
        status: string;
    } | null;
    task: {
        id: number;
        title: string;
        priority: string;
        status: "Pending" | "Completed";
    } | null;
};

export default function EmailDetailPage({ params }: EmailDetailPageProps) {
    const [emailId, setEmailId] = useState<string | null>(null);
    const [email, setEmail] = useState<EmailDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);

    useEffect(() => {
        async function resolveParams() {
            const resolvedParams = await params;
            setEmailId(resolvedParams.id);
        }

        resolveParams();
    }, [params]);

    useEffect(() => {
        if (!emailId) {
            return;
        }

        async function loadEmail() {
            const response = await fetch(`/api/emails/${emailId}`);
            const data = await response.json();

            setEmail(data);
            setIsLoading(false);
        }

        loadEmail();
    }, [emailId]);

    async function updateEmailStatus(status: "Reviewed" | "Not checked") {
        if (!email) {
            return;
        }

        const response = await fetch(`/api/emails/${email.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            alert("Failed to update email status");
            return;
        }

        setEmail({ ...email, status });
    }

    async function updateTaskStatus(status: "Pending" | "Completed") {
        if (!email?.task) {
            return;
        }

        const response = await fetch(`/api/tasks/${email.task.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            alert("Failed to update task status");
            return;
        }

        setEmail({
            ...email,
            task: {
                ...email.task,
                status,
            },
        });
    }

    async function copyReply() {
        if (!email?.aiReply?.preview) {
            return;
        }

        await navigator.clipboard.writeText(email.aiReply.preview);
        alert("AI reply copied");
    }

    async function regenerateReply() {
        if (!email?.aiReply) {
            return;
        }

        setIsRegenerating(true);

        const response = await fetch(`/api/replies/${email.aiReply.id}/regenerate`, {
            method: "POST",
        });

        setIsRegenerating(false);

        if (!response.ok) {
            const error = await response.json();
            alert(error.error ?? "Failed to regenerate reply");
            return;
        }

        const updatedReply = await response.json();

        setEmail({
            ...email,
            aiReply: {
                ...email.aiReply,
                ...updatedReply,
                id: email.aiReply.id,
            },
        });
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
                <p className="text-sm text-slate-500">Loading email...</p>
            </main>
        );
    }

    if (!email) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
                <p className="text-sm text-slate-500">Email not found.</p>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-5xl space-y-6">
                <Link
                    href="/email"
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
                >
                    <ArrowLeft size={18} />
                    Back to emails
                </Link>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <Inbox size={22} className="text-emerald-700" />
                                <span className="text-sm font-medium text-slate-500">
                                    Email
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-950">
                                {email.subject}
                            </h1>

                            <p className="mt-2 text-sm text-slate-500">From {email.from}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                {email.urgency}
                            </span>

                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                {email.status}
                            </span>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => updateEmailStatus("Reviewed")}
                            className={`inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition ${email.status === "Reviewed"
                                ? "bg-emerald-700 text-white"
                                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            Reviewed
                        </button>

                        <button
                            type="button"
                            onClick={() => updateEmailStatus("Not checked")}
                            className={`inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition ${email.status === "Not checked"
                                ? "bg-amber-500 text-white"
                                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                }`}
                        >
                            Not checked
                        </button>
                    </div>

                    <div className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        {email.preview}
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <Bot size={22} className="text-emerald-700" />
                                <h2 className="text-lg font-semibold text-slate-950">
                                    AI Reply
                                </h2>
                            </div>

                            {email.aiReply && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                    {email.aiReply.status}
                                </span>
                            )}
                        </div>

                        {email.aiReply ? (
                            <>
                                <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                                    {email.aiReply.preview}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={copyReply}
                                        className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                    >
                                        <Copy size={16} />
                                        Copy
                                    </button>

                                    <button
                                        type="button"
                                        onClick={regenerateReply}
                                        disabled={isRegenerating}
                                        className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-700 px-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-300"
                                    >
                                        <RefreshCw size={16} />
                                        {isRegenerating ? "Regenerating..." : "Regenerate"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-slate-500">No AI reply yet.</p>
                        )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <ListChecks size={22} className="text-emerald-700" />
                            <h2 className="text-lg font-semibold text-slate-950">
                                Generated Task
                            </h2>
                        </div>

                        {email.task ? (
                            <>
                                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="font-semibold text-slate-950">
                                        {email.task.title}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-500">
                                        Priority: {email.task.priority}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Status: {email.task.status}
                                    </p>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateTaskStatus("Completed")}
                                        className={`inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-medium transition ${email.task.status === "Completed"
                                            ? "bg-emerald-700 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <CheckCircle2 size={16} />
                                        Completed
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => updateTaskStatus("Pending")}
                                        className={`inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium transition ${email.task.status === "Pending"
                                            ? "bg-amber-500 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        Pending
                                    </button>
                                </div>
                            </>
                        ) : (
                            <p className="text-sm text-slate-500">No task generated.</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}