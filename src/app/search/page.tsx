type SearchPageProps = {
    searchParams: Promise<{
        q?: string;
    }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q } = await searchParams;
    const query = q?.trim() ?? "";

    return (
        <main className="mx-auto min-h-[calc(100vh-96px)] w-full max-w-6xl px-5 py-10">
            <h1 className="text-3xl font-bold text-slate-950">Search Results</h1>

            {query ? (
                <p className="mt-4 text-lg text-slate-600">
                    Showing results for: <span className="font-semibold">{query}</span>
                </p>
            ) : (
                <p className="mt-4 text-lg text-slate-600">
                    No search query provided.
                </p>
            )}
        </main>
    );
}