// import Link from "next/link";
// import { Bot, CheckCircle, Inbox, ListChecks, MailCheck } from "lucide-react";
import AdminLogin from "./auth/admin-login";
import UserLogin from "./auth/user-login";
import Register from "./auth/register";


import Link from "next/link";
import { ChevronDown, ShieldCheck, UserRound, UserPlus, Bot, CheckCircle, Inbox, ListChecks, MailCheck } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
              <Bot size={24} />
            </div>
            <span className="text-2xl font-bold text-slate-950">
              TaskPilot AI
            </span>
          </div>

          {/* <div className="flex items-center gap-3">
            {/* <Link
              href="/auth/login"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
            >
              Register
            </Link> */}

          {/* <Link href="/auth/login">User Login</Link>
            <Link href="/auth/admin/login">Admin Login</Link>
            <Link href="/auth/register">Register</Link>
          </div>  */}

          <div className="flex items-center gap-3">
            <div className="group relative">
              <button
                type="button"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-emerald-700 px-5 text-base font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Login
                <ChevronDown size={18} />
              </button>

              <div className="invisible absolute right-0 top-14 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
                <Link
                  href="/auth/login"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >
                  <UserRound size={20} />
                  <span className="font-medium">User Login</span>
                </Link>

                <Link
                  href="/auth/admin/login"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
                >

                  <ShieldCheck size={20} />
                  <span className="font-medium">Admin Login</span>
                </Link>

                {/* <Link href="/auth/admin-login">Admin Login</Link> */}
              </div>
            </div>

            <Link
              href="/auth/register"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-emerald-700 px-5 text-base font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              <UserPlus size={20} />
              Register
            </Link>
          </div>

        </header>

        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              AI-powered Gmail productivity app
            </p>

            <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight text-slate-950">
              Manage Gmail, generate AI replies, and turn emails into tasks.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              TaskPilot AI helps users connect Gmail, view recent inbox emails,
              generate professional AI reply suggestions, create tasks from
              messages, and send replies only after user approval.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/auth/register"
                className="rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800"
              >
                Get started
              </Link>
              <Link
                href="/auth/login"
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 hover:bg-slate-100"
              >
                Login
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-5">
              <Feature
                icon={Inbox}
                title="Connect Gmail"
                text="Securely connect a Gmail account with Google OAuth."
              />
              <Feature
                icon={MailCheck}
                title="Manage emails"
                text="Fetch recent inbox emails and review them inside the dashboard."
              />
              <Feature
                icon={Bot}
                title="Generate AI replies"
                text="Create professional reply drafts based on the selected email."
              />
              <Feature
                icon={ListChecks}
                title="Create tasks"
                text="Convert important email messages into actionable tasks."
              />
              <Feature
                icon={CheckCircle}
                title="User-approved sending"
                text="Replies are sent only when the user clicks the send button."
              />
            </div>
          </section>
        </div>

        <footer className="flex flex-col gap-3 border-t border-slate-200 py-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 TaskPilot AI. All rights reserved.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-emerald-700">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-emerald-700">
              Terms
            </Link>
            <a
              href="mailto:kajanthu18@gmail.com"
              className="hover:text-emerald-700"
            >
              Contact
            </a>
          </div>
        </footer>
      </section>
    </main>
  );
}

type FeatureProps = {
  icon: React.ElementType;
  title: string;
  text: string;
};

function Feature({ icon: Icon, title, text }: FeatureProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon size={22} />
      </div>
      <div>
        <h2 className="font-semibold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
      </div>
    </div>
  );
}