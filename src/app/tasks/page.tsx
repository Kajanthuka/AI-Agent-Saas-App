
"use client";

import { CheckCircle2, Circle, ListChecks, Timer } from "lucide-react";
import { useState, useEffect } from "react";

type Task = {
    id: number;
    title: string;
    source: string;
    priority: string;
    status: "Pending" | "Completed";
};

export default function TasksPage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadTasks() {
            const response = await fetch("/api/tasks");
            const data = await response.json();

            setTasks(data);
            setIsLoading(false);
        }

        loadTasks();
    }, []);


    async function updateTaskStatus(id: number, status: "Pending" | "Completed") {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            return;
        }

        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id ? { ...task, status } : task
            )
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Tasks</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Review AI-generated tasks from your emails.
                    </p>
                </div>

                <section className="grid gap-4 sm:grid-cols-3">
                    <TaskStatCard title="Total Tasks" value={tasks.length} icon={ListChecks} />

                    <TaskStatCard
                        title="Pending"
                        value={tasks.filter((task) => task.status === "Pending").length}
                        icon={Timer}
                    />

                    <TaskStatCard
                        title="Completed"
                        value={tasks.filter((task) => task.status === "Completed").length}
                        icon={CheckCircle2}
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-950">
                            Generated Tasks
                        </h2>
                        <ListChecks size={22} className="text-emerald-700" />
                    </div>

                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <article
                                key={task.id}
                                className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30"
                            >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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

                                <div className="mt-4 flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => updateTaskStatus(task.id, "Completed")}
                                        className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition ${task.status === "Completed"
                                            ? "bg-emerald-700 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <CheckCircle2 size={16} />
                                        Completed
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => updateTaskStatus(task.id, "Pending")}
                                        className={`inline-flex h-9 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition ${task.status === "Pending"
                                            ? "bg-amber-500 text-white"
                                            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <Circle size={16} />
                                        Pending
                                    </button>

                                    <span className="text-sm text-slate-500">
                                        Status: {task.status}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}

type TaskStatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
};

function TaskStatCard({ title, value, icon: Icon }: TaskStatCardProps) {
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

function PriorityBadge({ priority }: { priority: string }) {
    const className =
        priority === "High"
            ? "bg-red-100 text-red-700"
            : priority === "Medium"
                ? "bg-amber-100 text-amber-700"
                : "bg-emerald-100 text-emerald-700";

    return (
        <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
            {priority}
        </span>
    );
}
