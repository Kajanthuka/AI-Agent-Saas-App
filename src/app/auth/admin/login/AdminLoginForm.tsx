// // // "use client";

// // // import { Eye, EyeOff } from "lucide-react";
// // // import { useState } from "react";
// // // import { Button, Input } from "@nextui-org/react";
// // // import { zodResolver } from "@hookform/resolvers/zod";
// // // import { ShieldCheck } from "lucide-react";
// // // import Link from "next/link";
// // // import { useRouter } from "next/navigation";
// // // import { useForm } from "react-hook-form";

// // // import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";

// // // export default function AdminLoginForm() {
// // //     const router = useRouter();

// // //     const [showPassword, setShowPassword] = useState(false);
// // //     const {
// // //         register,
// // //         handleSubmit,
// // //         formState: { errors, isValid, isSubmitting },
// // //     } = useForm<LoginSchema>({
// // //         resolver: zodResolver(loginSchema),
// // //         mode: "onTouched",
// // //     });

// // //     const onSubmit = async (data: LoginSchema) => {
// // //         const response = await fetch("/api/auth/login", {
// // //             method: "POST",
// // //             headers: {
// // //                 "Content-Type": "application/json",
// // //             },
// // //             body: JSON.stringify({
// // //                 ...data,
// // //                 requiredRole: "admin",
// // //             }),
// // //         });

// // //         const result = await response.json();

// // //         if (!response.ok) {
// // //             alert(result.error ?? "Admin login failed");
// // //             return;
// // //         }

// // //         router.push("/dashboard");
// // //         router.refresh();
// // //     };

// // //     return (
// // //         <div className="mx-auto w-full max-w-md">
// // //             <div className="mb-8 text-center">
// // //                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
// // //                     <ShieldCheck size={34} />
// // //                 </div>

// // //                 <h2 className="text-3xl font-bold text-slate-950">
// // //                     Admin Login
// // //                 </h2>

// // //                 <p className="mt-3 text-slate-500">
// // //                     Sign in with your admin account to continue.
// // //                 </p>
// // //             </div>

// // //             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
// // //                 <Input
// // //                     label="Admin email"
// // //                     type="email"
// // //                     variant="bordered"
// // //                     autoComplete="email"
// // //                     {...register("email")}
// // //                     isInvalid={!!errors.email}
// // //                     errorMessage={errors.email?.message as string}
// // //                 />


// // //                 <Input
// // //                     defaultValue=""
// // //                     label="Password"
// // //                     type={showPassword ? "text" : "password"}
// // //                     variant="bordered"
// // //                     {...register("password")}
// // //                     isInvalid={!!errors.password}
// // //                     errorMessage={errors.password?.message as string}
// // //                     endContent={
// // //                         <button
// // //                             type="button"
// // //                             onClick={() => setShowPassword((current) => !current)}
// // //                             className="text-slate-500 hover:text-emerald-700"
// // //                             aria-label={showPassword ? "Hide password" : "Show password"}
// // //                         >
// // //                             {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// // //                         </button>
// // //                     }
// // //                 />

// // //                 <Button
// // //                     fullWidth
// // //                     type="submit"
// // //                     isDisabled={!isValid || isSubmitting}
// // //                     isLoading={isSubmitting}
// // //                     className="h-12 bg-emerald-700 text-base font-semibold text-white hover:bg-emerald-800"
// // //                 >
// // //                     Login as Admin
// // //                 </Button>
// // //             </form>

// // //             <div className="mt-6 flex items-center justify-between text-sm">
// // //                 <Link href="/auth/login" className="text-slate-500 hover:text-emerald-700">
// // //                     User login
// // //                 </Link>

// // //                 <Link href="/" className="text-slate-500 hover:text-emerald-700">
// // //                     Back to home
// // //                 </Link>
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // "use client";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import { Button, Card, CardBody, Input } from "@nextui-org/react";
// // import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { useForm } from "react-hook-form";

// // import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";

// // export default function AdminLoginForm() {
// //     const router = useRouter();
// //     const [showPassword, setShowPassword] = useState(false);

// //     const {
// //         register,
// //         handleSubmit,
// //         formState: { errors, isValid, isSubmitting },
// //     } = useForm<LoginSchema>({
// //         resolver: zodResolver(loginSchema),
// //         mode: "onTouched",
// //     });

// //     const onSubmit = async (data: LoginSchema) => {
// //         const response = await fetch("/api/auth/login", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({
// //                 ...data,
// //                 requiredRole: "admin",
// //             }),
// //         });

// //         const result = await response.json();

// //         if (!response.ok) {
// //             alert(result.error ?? "Admin login failed");
// //             return;
// //         }

// //         // router.push("/dashboard");
// //         router.push("/admin/dashboard");
// //         router.refresh();
// //     };

// //     return (
// //         <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
// //             <Card className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl">
// //                 <CardBody className="p-8">
// //                     <div className="mb-8 text-center">
// //                         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
// //                             <ShieldCheck size={34} />
// //                         </div>

// //                         <h1 className="text-3xl font-bold text-slate-950">
// //                             Admin Login
// //                         </h1>

// //                         <p className="mt-3 text-sm leading-6 text-slate-500">
// //                             Sign in to manage members, settings, security, and workspace access.
// //                         </p>
// //                     </div>

// //                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
// //                         <Input
// //                             label="Admin email"
// //                             type="email"
// //                             variant="bordered"
// //                             autoComplete="email"
// //                             startContent={<Mail size={18} className="text-slate-400" />}
// //                             {...register("email")}
// //                             isInvalid={!!errors.email}
// //                             errorMessage={errors.email?.message as string}
// //                         />

// //                         <Input
// //                             label="Password"
// //                             type={showPassword ? "text" : "password"}
// //                             variant="bordered"
// //                             autoComplete="current-password"
// //                             startContent={<LockKeyhole size={18} className="text-slate-400" />}
// //                             endContent={
// //                                 <button
// //                                     type="button"
// //                                     onClick={() => setShowPassword((current) => !current)}
// //                                     className="text-slate-400 transition hover:text-emerald-700"
// //                                     aria-label={showPassword ? "Hide password" : "Show password"}
// //                                 >
// //                                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
// //                                 </button>
// //                             }
// //                             {...register("password")}
// //                             isInvalid={!!errors.password}
// //                             errorMessage={errors.password?.message as string}
// //                         />

// //                         <Button
// //                             fullWidth
// //                             type="submit"
// //                             isDisabled={!isValid || isSubmitting}
// //                             isLoading={isSubmitting}
// //                             className="h-12 rounded-xl bg-emerald-700 text-base font-semibold text-white hover:bg-emerald-800"
// //                         >
// //                             Login as Admin
// //                         </Button>
// //                     </form>

// //                     <div className="mt-6 flex items-center justify-between text-sm">
// //                         <Link
// //                             href="/auth/login"
// //                             className="text-slate-500 transition hover:text-emerald-700"
// //                         >
// //                             User login
// //                         </Link>

// //                         <Link
// //                             href="/"
// //                             className="text-slate-500 transition hover:text-emerald-700"
// //                         >
// //                             Back to home
// //                         </Link>
// //                     </div>
// //                 </CardBody>
// //             </Card>
// //         </main>
// //     );
// // }


// "use client";

// import AdminGuard from "@/components/AdminGuard";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//     Bot,
//     Inbox,
//     LayoutDashboard,
//     ListChecks,
//     Settings,
//     ShieldCheck,
//     Users,
// } from "lucide-react";

// type AdminDashboardData = {
//     admin: {
//         id: number;
//         name: string;
//         email: string;
//         role: string;
//     };
//     stats: {
//         totalUsers: number;
//         admins: number;
//         members: number;
//         emails: number;
//         aiReplies: number;
//         tasks: number;
//     };
//     users: {
//         id: number;
//         name: string;
//         email: string;
//         role: string;
//         created_at: string;
//     }[];
// };

// export default function AdminDashboardPage() {
//     const [data, setData] = useState<AdminDashboardData | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         async function loadAdminDashboard() {
//             const response = await fetch("/api/auth/admin/dashboard", {
//                 cache: "no-store",
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 setData(result);
//             }

//             setIsLoading(false);
//         }

//         loadAdminDashboard();
//     }, []);

//     return (
//         <AdminGuard>
//             <main className="min-h-[calc(100vh-120px)] bg-slate-50 px-6 py-8">
//                 <div className="mx-auto max-w-7xl space-y-8">
//                     <section>
//                         <p className="text-sm font-semibold uppercase text-emerald-700">
//                             Admin Area
//                         </p>
//                         <h1 className="mt-2 text-3xl font-bold text-slate-950">
//                             Admin Dashboard
//                         </h1>
//                         <p className="mt-2 text-slate-600">
//                             Manage users, app access, emails, AI replies, and tasks.
//                         </p>
//                     </section>

//                     {isLoading ? (
//                         <p className="text-slate-500">Loading admin dashboard...</p>
//                     ) : data ? (
//                         <>
//                             <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//                                 <AdminStat title="Total Users" value={data.stats.totalUsers} icon={Users} />
//                                 <AdminStat title="Admins" value={data.stats.admins} icon={ShieldCheck} />
//                                 <AdminStat title="Emails" value={data.stats.emails} icon={Inbox} />
//                                 <AdminStat title="AI Replies" value={data.stats.aiReplies} icon={Bot} />
//                             </section>

//                             <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
//                                 <AdminLink href="/dashboard" title="User Dashboard" icon={LayoutDashboard} />
//                                 <AdminLink href="/members" title="Members" icon={Users} />
//                                 <AdminLink href="/settings" title="Settings" icon={Settings} />
//                                 <AdminLink href="/tasks" title="Tasks" icon={ListChecks} />
//                             </section>

//                             <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//                                 <h2 className="text-xl font-bold text-slate-950">
//                                     Registered Users
//                                 </h2>

//                                 <div className="mt-5 space-y-3">
//                                     {data.users.map((user) => (
//                                         <div
//                                             key={user.id}
//                                             className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
//                                         >
//                                             <div>
//                                                 <p className="font-semibold text-slate-950">
//                                                     {user.name}
//                                                 </p>
//                                                 <p className="text-sm text-slate-500">
//                                                     {user.email}
//                                                 </p>
//                                             </div>

//                                             <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
//                                                 {user.role}
//                                             </span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </section>
//                         </>
//                     ) : (
//                         <p className="text-red-600">Could not load admin dashboard.</p>
//                     )}
//                 </div>
//             </main>
//         </AdminGuard>
//     );
// }

// function AdminStat({
//     title,
//     value,
//     icon: Icon,
// }: {
//     title: string;
//     value: number;
//     icon: React.ElementType;
// }) {
//     return (
//         <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
//             <div className="flex items-start justify-between">
//                 <div>
//                     <p className="text-sm font-semibold text-slate-500">{title}</p>
//                     <p className="mt-5 text-4xl font-bold text-slate-950">{value}</p>
//                 </div>

//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
//                     <Icon size={24} />
//                 </div>
//             </div>
//         </article>
//     );
// }

// function AdminLink({
//     href,
//     title,
//     icon: Icon,
// }: {
//     href: string;
//     title: string;
//     icon: React.ElementType;
// }) {
//     return (
//         <Link
//             href={href}
//             className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
//         >
//             <Icon className="text-emerald-700" size={24} />
//             {title}
//         </Link>
//     );
// }



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