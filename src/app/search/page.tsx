// type SearchPageProps = {
//     searchParams: Promise<{
//         q?: string;
//     }>;
// };

// export default async function SearchPage({ searchParams }: SearchPageProps) {
//     const { q } = await searchParams;
//     const query = q?.trim() ?? "";

//     return (
//         <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-5 py-10">
//             <h1 className="text-3xl font-bold text-slate-950">Search Results</h1>

//             {query ? (
//                 <p className="mt-4 text-lg text-slate-600">
//                     Showing results for: <span className="font-semibold">{query}</span>
//                 </p>
//             ) : (
//                 <p className="mt-4 text-lg text-slate-600">
//                     No search query provided.
//                 </p>
//             )}
//         </main>
//     );
// }
import Link from "next/link";
import {
    Bot,
    Inbox,
    ListChecks,
    Search,
} from "lucide-react";

type SearchPageProps = {
    searchParams: Promise<{
        q?: string;
    }>;
};

const searchData = [
    {
        id: 1,
        type: "Email",
        title: "Client onboarding call needs confirmation",
        description: "Sarah Johnson asked to confirm today's onboarding call.",
        href: "/email",
        icon: Inbox,
    },
    {
        id: 2,
        type: "Email",
        title: "Invoice question",
        description: "Michael Chen asked about a difference in the invoice total.",
        href: "/email",
        icon: Inbox,
    },
    {
        id: 3,
        type: "Task",
        title: "Send onboarding meeting link",
        description: "Generated task from Sarah Johnson email.",
        href: "/tasks",
        icon: ListChecks,
    },
    {
        id: 4,
        type: "Task",
        title: "Review invoice total",
        description: "Generated task from Michael Chen email.",
        href: "/tasks",
        icon: ListChecks,
    },
    {
        id: 5,
        type: "AI Reply",
        title: "Reply to Sarah Johnson",
        description: "Suggested reply confirming the onboarding call.",
        href: "/replies",
        icon: Bot,
    },
    {
        id: 6,
        type: "AI Reply",
        title: "Reply to Michael Chen",
        description: "Suggested reply about reviewing the invoice.",
        href: "/replies",
        icon: Bot,
    },
];

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.trim() ?? "";
    const normalizedQuery = query.toLowerCase();

    const filteredResults = query
        ? searchData.filter((item) => {
            return (
                item.type.toLowerCase().includes(normalizedQuery) ||
                item.title.toLowerCase().includes(normalizedQuery) ||
                item.description.toLowerCase().includes(normalizedQuery)
            );
        })
        : searchData;

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-950">Search Results</h1>

                    {query ? (
                        <p className="mt-1 text-sm text-slate-500">
                            Showing results for:{" "}
                            <span className="font-semibold text-slate-700">{query}</span>
                        </p>
                    ) : (
                        <p className="mt-1 text-sm text-slate-500">
                            Showing all searchable emails, tasks, and AI replies.
                        </p>
                    )}
                </div>

                <section className="grid gap-4 sm:grid-cols-3">
                    <SearchStatCard title="All Results" value={filteredResults.length} icon={Search} />

                    <SearchStatCard
                        title="Emails"
                        value={filteredResults.filter((item) => item.type === "Email").length}
                        icon={Inbox}
                    />

                    <SearchStatCard
                        title="Tasks & Replies"
                        value={
                            filteredResults.filter(
                                (item) => item.type === "Task" || item.type === "AI Reply"
                            ).length
                        }
                        icon={Bot}
                    />
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-950">Results</h2>

                        <span className="text-sm text-slate-500">
                            {filteredResults.length} found
                        </span>
                    </div>

                    {filteredResults.length === 0 ? (
                        <div className="flex min-h-40 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50">
                            <p className="text-sm text-slate-500">No results found.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredResults.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:bg-emerald-50/30 sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                                <Icon size={20} />
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="font-semibold text-slate-950">
                                                        {item.title}
                                                    </p>

                                                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                                                        {item.type}
                                                    </span>
                                                </div>

                                                <p className="mt-1 text-sm leading-6 text-slate-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="text-sm font-medium text-emerald-700">
                                            Open
                                        </span>
                                    </Link>
                                );
                            })}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}

type SearchStatCardProps = {
    title: string;
    value: number;
    icon: React.ElementType;
};

function SearchStatCard({ title, value, icon: Icon }: SearchStatCardProps) {
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

