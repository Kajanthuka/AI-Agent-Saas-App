// import React from 'react'

// export default function FeedbackPage() {
//     return (
//         <main className="p-6">
//             <h1 className="text-2xl font-bold">Send Feedback</h1>
//             <p className="mt-2 text-gray-600">
//                 Share your feedback with us here.
//             </p>
//         </main>
//     )
// }

import {
    Bug,
    Lightbulb,
    MessageSquareText,
    Send,
    Smile,
    Star,
} from "lucide-react";
import type { ElementType } from "react";

const feedbackTypes = [
    {
        title: "Bug report",
        description: "Something is broken or not working as expected.",
        icon: Bug,
    },
    {
        title: "Feature request",
        description: "Suggest a new workflow, automation, or improvement.",
        icon: Lightbulb,
    },
    {
        title: "General feedback",
        description: "Share thoughts about your experience using the app.",
        icon: MessageSquareText,
    },
];

export default function FeedbackPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Send Feedback</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Tell us what is working, what is confusing, or what you would like
                        to see next.
                    </p>
                </div>

                <section className="grid gap-6 xl:grid-cols-3">
                    {feedbackTypes.map((type) => {
                        const Icon = type.icon;

                        return (
                            <div
                                key={type.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                    <Icon size={22} />
                                </div>

                                <h2 className="text-lg font-semibold text-slate-950">
                                    {type.title}
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {type.description}
                                </p>
                            </div>
                        );
                    })}
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-5 flex items-center gap-2">
                            <Send size={22} className="text-emerald-700" />
                            <h2 className="text-lg font-semibold text-slate-950">
                                Feedback Form
                            </h2>
                        </div>

                        <form className="space-y-4">
                            <FeedbackField
                                label="Subject"
                                placeholder="Short summary of your feedback"
                            />

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">
                                    Feedback type
                                </span>

                                <select className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                                    <option>Bug report</option>
                                    <option>Feature request</option>
                                    <option>General feedback</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="text-sm font-medium text-slate-700">
                                    Message
                                </span>

                                <textarea
                                    rows={7}
                                    placeholder="Write your feedback here..."
                                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                />
                            </label>

                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 text-sm font-medium text-white transition hover:bg-emerald-800"
                            >
                                <Send size={18} />
                                Send feedback
                            </button>
                        </form>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <Star size={22} className="text-emerald-700" />
                                <h2 className="text-lg font-semibold text-slate-950">
                                    Rate your experience
                                </h2>
                            </div>

                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <button
                                        key={rating}
                                        type="button"
                                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                    >
                                        {rating}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                            <div className="mb-3 flex items-center gap-2">
                                <Smile size={22} className="text-emerald-700" />
                                <h2 className="text-lg font-semibold text-emerald-950">
                                    Thanks for helping
                                </h2>
                            </div>

                            <p className="text-sm leading-6 text-emerald-800">
                                Feedback helps improve email triage, AI replies, task
                                generation, and workspace workflows.
                            </p>
                        </div>
                    </aside>
                </section>
            </div>
        </main>
    );
}

function FeedbackField({
    label,
    placeholder,
}: {
    label: string;
    placeholder: string;
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-slate-700">{label}</span>
            <input
                placeholder={placeholder}
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
        </label>
    );
}