"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

type ChatMessage = {
    role: "user" | "bot";
    text: string;
};

const suggestedQuestions = [
    "Fees",
    "Intakes",
    "Entry requirements",
    "Campus",
    "Work placement",
    "Apply",
];

const seenCountKey = "emailBotSeenCourseDraftCount";

export default function CourseChatbot() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "bot",
            text: "Hi! I can help answer course questions and support email reply drafts.",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [replyCount, setReplyCount] = useState(0);
    const [seenReplyCount, setSeenReplyCount] = useState(0);

    const visibleReplyCount = useMemo(() => {
        return Math.max(replyCount - seenReplyCount, 0);
    }, [replyCount, seenReplyCount]);

    async function checkLoggedIn() {
        try {
            const response = await fetch("/api/auth/me", {
                cache: "no-store",
            });

            if (!response.ok) return false;

            const data = await response.json();

            return !!data.user;
        } catch {
            return false;
        }
    }

    useEffect(() => {
        const storedSeenCount = Number(
            window.localStorage.getItem(seenCountKey) ?? "0"
        );

        setSeenReplyCount(Number.isNaN(storedSeenCount) ? 0 : storedSeenCount);
    }, []);

    useEffect(() => {
        async function loadReplyCount() {
            try {
                const loggedIn = await checkLoggedIn();

                if (!loggedIn) {
                    setReplyCount(0);
                    setSeenReplyCount(0);
                    return;
                }

                const response = await fetch(
                    "/api/replies?countOnly=true&status=Draft&courseOnly=true",
                    { cache: "no-store" }
                );

                if (!response.ok) {
                    setReplyCount(0);
                    return;
                }

                const data = await response.json();
                const count = typeof data.count === "number" ? data.count : 0;

                setReplyCount(count);

                const storedSeenCount = Number(
                    window.localStorage.getItem(seenCountKey) ?? "0"
                );

                if (Number.isNaN(storedSeenCount) || storedSeenCount > count) {
                    window.localStorage.setItem(seenCountKey, String(count));
                    setSeenReplyCount(count);
                } else {
                    setSeenReplyCount(storedSeenCount);
                }
            } catch (error) {
                console.error("Load reply count error:", error);
            }
        }

        loadReplyCount();

        const interval = window.setInterval(loadReplyCount, 30000);

        return () => {
            window.clearInterval(interval);
        };
    }, []);

    async function handleOpenBot() {
        const loggedIn = await checkLoggedIn();

        if (!loggedIn) {
            router.push("/auth/login?next=/dashboard");
            return;
        }

        setIsOpen(true);
    }

    async function handleReviewReplies() {
        const loggedIn = await checkLoggedIn();

        if (!loggedIn) {
            router.push("/auth/login?next=/replies");
            return;
        }

        window.localStorage.setItem(seenCountKey, String(replyCount));
        setSeenReplyCount(replyCount);
        setIsOpen(false);

        router.push("/replies?courseOnly=true");
    }

    async function sendQuestion(question: string) {
        const loggedIn = await checkLoggedIn();

        if (!loggedIn) {
            router.push("/auth/login?next=/dashboard");
            return;
        }

        const cleanQuestion = question.trim();

        if (!cleanQuestion) return;

        setMessages((current) => [
            ...current,
            { role: "user", text: cleanQuestion },
        ]);

        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chatbot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: cleanQuestion }),
            });

            const data = await response.json();

            setMessages((current) => [
                ...current,
                {
                    role: "bot",
                    text: data.reply ?? "Sorry, I could not answer that.",
                },
            ]);
        } catch {
            setMessages((current) => [
                ...current,
                {
                    role: "bot",
                    text: "Sorry, I could not answer right now. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await sendQuestion(input);
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen ? (
                <div className="w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                    <div className="flex items-center justify-between bg-emerald-800 px-4 py-3 text-white">
                        <div>
                            <p className="font-semibold">Email Bot 🤖</p>
                            <p className="text-xs text-emerald-100">
                                Course replies online 24/7
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="rounded-lg px-2 py-1 text-sm font-semibold hover:bg-white/10"
                        >
                            X
                        </button>
                    </div>

                    {visibleReplyCount > 0 ? (
                        <button
                            type="button"
                            onClick={handleReviewReplies}
                            className="block w-full border-b bg-amber-50 px-4 py-3 text-left text-sm font-semibold text-amber-800 hover:bg-amber-100"
                        >
                            {visibleReplyCount} new course draft AI repl
                            {visibleReplyCount === 1 ? "y" : "ies"} ready. Click to review.
                        </button>
                    ) : null}

                    <div className="h-80 space-y-3 overflow-y-auto p-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${message.role === "user"
                                    ? "ml-auto bg-emerald-700 text-white"
                                    : "mr-auto bg-slate-100 text-slate-800"
                                    }`}
                            >
                                {message.text}
                            </div>
                        ))}

                        {isLoading ? (
                            <div className="mr-auto max-w-[85%] rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-500">
                                Typing...
                            </div>
                        ) : null}
                    </div>

                    <div className="flex flex-wrap gap-2 border-t px-3 py-2">
                        {suggestedQuestions.map((question) => (
                            <button
                                key={question}
                                type="button"
                                disabled={isLoading}
                                onClick={() => sendQuestion(question)}
                                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {question}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3">
                        <input
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask about course emails..."
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-600"
                        />

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                        >
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={handleOpenBot}
                    className="relative rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-xl hover:bg-emerald-900"
                >
                    Email Bot 🤖

                    {visibleReplyCount > 0 ? (
                        <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-red-600 px-2 text-xs font-bold text-white">
                            {visibleReplyCount}
                        </span>
                    ) : null}
                </button>
            )}
        </div>
    );
}