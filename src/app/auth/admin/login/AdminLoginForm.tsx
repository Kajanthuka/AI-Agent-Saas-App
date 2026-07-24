"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

export default function AdminLoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    requiredRole: "admin",
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.error || "Admin login failed");
            }

            router.push("/admin/dashboard");
            router.refresh();
        } catch (error) {
            setError(error instanceof Error ? error.message : "Admin login failed");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-md">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <ShieldCheck size={34} />
                </div>

                <h2 className="text-3xl font-bold text-slate-950">Admin Login</h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Sign in with your admin account to manage TaskPilot AI.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Admin email
                    </span>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-emerald-500">
                        <Mail size={18} className="text-slate-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            autoComplete="email"
                            required
                            className="w-full bg-transparent text-slate-950 outline-none"
                            placeholder="admin@example.com"
                        />
                    </div>
                </label>

                <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-700">
                        Password
                    </span>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-emerald-500">
                        <LockKeyhole size={18} className="text-slate-400" />
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            autoComplete="current-password"
                            required
                            className="w-full bg-transparent text-slate-950 outline-none"
                            placeholder="Enter password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((current) => !current)}
                            className="text-slate-400 transition hover:text-emerald-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </label>

                {error ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </div>
                ) : null}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-xl bg-emerald-700 text-base font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {isSubmitting ? "Signing in..." : "Login as Admin"}
                </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm">
                <Link href="/auth/login" className="text-slate-500 hover:text-emerald-700">
                    User login
                </Link>

                <Link href="/" className="text-slate-500 hover:text-emerald-700">
                    Back to home
                </Link>
            </div>
        </div>
    );
}