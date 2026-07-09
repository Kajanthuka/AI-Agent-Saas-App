export default function PrivacyPage() {
    return (
        <main className="mx-auto min-h-screen max-w-4xl px-6 py-12 text-slate-800">
            <h1 className="text-4xl font-bold text-slate-950">Privacy Policy</h1>

            <p className="mt-6">
                TaskPilot AI helps users connect Gmail, manage emails, generate AI
                reply drafts, create tasks, and send user-approved replies.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Google User Data</h2>
            <p className="mt-3">
                TaskPilot AI accesses Gmail data only after the user grants permission
                through Google OAuth. Gmail data is used to show emails, generate reply
                suggestions, create tasks, and send replies only when approved by the user.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Data Storage</h2>
            <p className="mt-3">
                The app may store email metadata, message content, AI replies, task data,
                and sent reply status in PostgreSQL to provide the app features.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Data Sharing</h2>
            <p className="mt-3">
                TaskPilot AI does not sell Google user data. Gmail data is not shared with
                third parties except where required to provide the app functionality.
            </p>

            <h2 className="mt-8 text-2xl font-semibold">Contact</h2>
            <p className="mt-3">Contact: kajanthu18@gmail.com</p>
        </main>
    );
}