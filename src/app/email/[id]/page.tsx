import Link from "next/link";
import { ArrowLeft, Bot, Inbox, ListChecks } from "lucide-react";

type EmailDetailPageProps = {
    params: Promise<{
        id: string;
    }>;
};

async function getEmail(id: string) {
    const response = await fetch(`http://localhost:3000/api/emails/${id}`, {
        cache: "no-store",
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export default async function EmailDetailPage({ params }: EmailDetailPageProps) {
    const { id } = await params;
    const email = await getEmail(id);

    if (!email) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
                <div className="mx-auto max-w-5xl">
                    <p className="text-sm text-slate-500">Email not found.</p>
                </div>
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
                    <div className="mb-4 flex items-start justify-between gap-4">
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

                            <p className="mt-2 text-sm text-slate-500">
                                From {email.from}
                            </p>
                        </div>

                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            {email.urgency}
                        </span>
                    </div>

                    <div className="mt-5 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        {email.preview}
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center gap-2">
                            <Bot size={22} className="text-emerald-700" />
                            <h2 className="text-lg font-semibold text-slate-950">
                                AI Reply
                            </h2>
                        </div>

                        {email.aiReply ? (
                            <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                                {email.aiReply.preview}
                            </p>
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
                        ) : (
                            <p className="text-sm text-slate-500">No task generated.</p>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}