"use client";

import { useEffect, useState } from "react";
import {
    AlertTriangle,
    CheckCircle2,
    Mail,
    MousePointerClick,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

type EmailHealth = {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    complained: number;
    unsubscribed: number;
    deliveryRate: number;
    openRate: number;
    clickRate: number;
    bounceRate: number;
    complaintRate: number;
};

export default function EmailHealthPage() {
    const [stats, setStats] = useState<EmailHealth | null>(null);

    useEffect(() => {
        async function loadEmailHealth() {
            const response = await fetch("/api/email-health", {
                cache: "no-store",
            });

            const data = await response.json();
            setStats(data);
        }

        loadEmailHealth();
    }, []);

    if (!stats) {
        return (
            <main className="space-y-6">
                <h1 className="text-3xl font-bold text-slate-950">Email Health</h1>
                <p className="text-slate-500">Loading email health...</p>
            </main>
        );
    }

    const cards = [
        {
            title: "Sent",
            value: stats.sent,
            rate: "Total system emails",
            icon: Mail,
        },
        {
            title: "Delivered",
            value: stats.delivered,
            rate: `${stats.deliveryRate}% delivery rate`,
            icon: CheckCircle2,
        },
        {
            title: "Opened",
            value: stats.opened,
            rate: `${stats.openRate}% open rate`,
            icon: TrendingUp,
        },
        {
            title: "Clicked",
            value: stats.clicked,
            rate: `${stats.clickRate}% click rate`,
            icon: MousePointerClick,
        },
    ];

    return (
        <main className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-950">
                    Email Health & Deliverability
                </h1>
                <p className="mt-2 text-slate-600">
                    Monitor TaskPilot AI system email delivery, bounces, complaints, and sender reputation.
                </p>
            </div>

            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <article
                            key={card.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="font-medium text-slate-600">{card.title}</p>
                                <Icon className="h-6 w-6 text-emerald-700" />
                            </div>

                            <p className="mt-5 text-4xl font-bold text-slate-950">
                                {card.value}
                            </p>

                            <p className="mt-2 text-sm text-slate-500">{card.rate}</p>
                        </article>
                    );
                })}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-emerald-700" />
                    <h2 className="text-xl font-semibold text-slate-950">
                        Email Authentication
                    </h2>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 p-4">
                        <p className="font-semibold text-slate-950">SPF</p>
                        <p className="mt-2 text-sm text-slate-600">
                            Confirms which services can send email for taskpilot-ai.com.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                        <p className="font-semibold text-slate-950">DKIM</p>
                        <p className="mt-2 text-sm text-slate-600">
                            Adds a trusted signature so inbox providers know emails are real.
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 p-4">
                        <p className="font-semibold text-slate-950">DMARC</p>
                        <p className="mt-2 text-sm text-slate-600">
                            Tells inbox providers what to do if SPF or DKIM fails.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                    <h2 className="text-xl font-semibold text-slate-950">
                        Failed / Risk Assessment
                    </h2>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <div>
                        <p className="text-sm text-slate-500">Bounced</p>
                        <p className="text-3xl font-bold text-slate-950">{stats.bounced}</p>
                        <p className="text-sm text-slate-500">{stats.bounceRate}% bounce rate</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">Complaints</p>
                        <p className="text-3xl font-bold text-slate-950">{stats.complained}</p>
                        <p className="text-sm text-slate-500">{stats.complaintRate}% complaint rate</p>
                    </div>

                    <div>
                        <p className="text-sm text-slate-500">Unsubscribed</p>
                        <p className="text-3xl font-bold text-slate-950">{stats.unsubscribed}</p>
                        <p className="text-sm text-slate-500">Users opted out</p>
                    </div>
                </div>
            </section>
        </main>
    );
}