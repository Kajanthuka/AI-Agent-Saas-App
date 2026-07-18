// 'use client';
// import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
// import { GiPadlock } from 'react-icons/gi';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema';
// import { useRouter } from "next/navigation";

// import { Eye, EyeOff } from "lucide-react";
// import { useState } from "react";
// export default function LoginForm() {
//     const router = useRouter();

//     const [showPassword, setShowPassword] = useState(false);
//     const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginSchema>({
//         resolver: zodResolver(loginSchema),
//         mode: 'onTouched'

//     });

//     const onSubmit = async (data: LoginSchema) => {
//         const response = await fetch("/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });


//         const result = await response.json();

//         if (!response.ok) {
//             alert(result.error ?? "Login failed");
//             return;
//         }

//         router.push("/dashboard");
//         router.refresh();
//     };


//     return (
//         <Card className='mt-16 w-full max-w-md mx-auto'>
//             <CardHeader className='flex flex-col items-center justify-center'>
//                 <div className='flex flex-col gap-2 items-center text-slate-700'>
//                     <div className='flex  flex-row items-center gap-3'>
//                         <GiPadlock size={30} />
//                         <h1 className='text-2xl font-semibold'>Login</h1>
//                     </div>
//                     <p className='text-neutral-500'>Welcome back to TaskPilotAI! </p>

//                 </div>
//             </CardHeader>
//             <CardBody>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className='space-y-4'>
//                         <Input
//                             defaultValue=''
//                             label='Email'
//                             type="email"
//                             autoComplete="email"
//                             variant='bordered'
//                             {...register('email')}
//                             isInvalid={!!errors.email}
//                             errorMessage={errors.email?.message as string}
//                         />

//                         <Input
//                             defaultValue=""
//                             label="Password"
//                             type={showPassword ? "text" : "password"}
//                             variant="bordered"
//                             {...register("password")}
//                             isInvalid={!!errors.password}
//                             errorMessage={errors.password?.message as string}
//                             endContent={
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword((current) => !current)}
//                                     className="text-slate-500 hover:text-emerald-700"
//                                     aria-label={showPassword ? "Hide password" : "Show password"}
//                                 >
//                                     {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                 </button>
//                             }
//                         />
//                         <Button
//                             isDisabled={!isValid}
//                             fullWidth
//                             type="submit"
//                             className="bg-emerald-600 text-white hover:bg-emerald-700">
//                             Login
//                         </Button>

//                         <p className='text-neutral-500'> New User?
//                             <a href='/auth/register' className='text-emerald-600 hover:underline'>Register here</a></p>
//                     </div>

//                 </form>
//             </CardBody>
//         </Card>
//     )
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: LoginSchema) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error ?? "Login failed");
                return;
            }

            router.push("/dashboard");
            router.refresh();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <Card className="w-full max-w-md rounded-3xl border border-slate-200 bg-white shadow-xl">
                <CardBody className="p-8">
                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                            <Sparkles size={30} />
                        </div>

                        <h1 className="text-3xl font-bold text-slate-950">
                            Welcome back
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Login to continue managing your emails, AI replies, and tasks.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            autoComplete="email"
                            variant="bordered"
                            startContent={<Mail size={18} className="text-slate-400" />}
                            {...register("email")}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            variant="bordered"
                            startContent={<LockKeyhole size={18} className="text-slate-400" />}
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((current) => !current)}
                                    className="text-slate-400 transition hover:text-emerald-700"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            }
                            {...register("password")}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message as string}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            isDisabled={!isValid || isSubmitting}
                            isLoading={isSubmitting}
                            className="h-12 rounded-xl bg-emerald-700 text-base font-semibold text-white hover:bg-emerald-800"
                        >
                            Login
                        </Button>
                    </form>

                    <div className="mt-6 flex items-center justify-between text-sm">
                        <Link href="/" className="text-slate-500 hover:text-emerald-700">
                            Back to home
                        </Link>

                        <p className="text-slate-500">
                            New user?{" "}
                            <Link
                                href="/auth/register"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Register
                            </Link>
                        </p>
                    </div>
                </CardBody>
            </Card>
        </main>
    );
}
