// 'use client';

// import React from 'react'
// import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
// import { GiPadlock } from 'react-icons/gi';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';
// import { useRouter } from "next/navigation";


// export default function RegisterFrom() {
//     const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterSchema>({
//         resolver: zodResolver(registerSchema),
//         mode: 'onTouched'

//     });
//     const router = useRouter();

//     const onSubmit = async (data: RegisterSchema) => {
//         const response = await fetch("/api/auth/register", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();

//         if (!response.ok) {
//             alert(result.error ?? "Register failed");
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
//                         <h1 className='text-2xl font-semibold'>Register</h1>
//                     </div>
//                     <p className='text-neutral-500'>Welcome to TaskPilotAI! </p>

//                 </div>
//             </CardHeader>
//             <CardBody>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className='space-y-4'>



//                         <Input
//                             defaultValue=""
//                             label="Name"
//                             autoComplete="name"
//                             variant="bordered"
//                             {...register("name")}
//                             isInvalid={!!errors.name}
//                             errorMessage={errors.name?.message}
//                         />



//                         <Input
//                             defaultValue=""
//                             label="Email"
//                             type="email"
//                             autoComplete="email"
//                             variant="bordered"
//                             {...register("email")}
//                             isInvalid={!!errors.email}
//                             errorMessage={errors.email?.message}
//                         />

//                         <Input
//                             defaultValue=""
//                             label="Password"
//                             type="password"
//                             autoComplete="new-password"
//                             variant="bordered"
//                             {...register("password")}
//                             isInvalid={!!errors.password}
//                             errorMessage={errors.password?.message}
//                         />

//                         <Button
//                             isDisabled={!isValid}
//                             fullWidth
//                             type="submit"
//                             className="bg-emerald-600 text-white hover:bg-emerald-700">
//                             Register
//                         </Button>

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
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";

export default function RegisterFrom() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: RegisterSchema) => {
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error ?? "Register failed");
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
                            Create account
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Join TaskPilot AI to manage emails, AI replies, and tasks.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <Input
                            label="Name"
                            autoComplete="name"
                            variant="bordered"
                            startContent={<UserRound size={18} className="text-slate-400" />}
                            {...register("name")}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />

                        <Input
                            label="Email"
                            type="email"
                            autoComplete="email"
                            variant="bordered"
                            startContent={<Mail size={18} className="text-slate-400" />}
                            {...register("email")}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
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
                            errorMessage={errors.password?.message}
                        />

                        <Button
                            fullWidth
                            type="submit"
                            isDisabled={!isValid || isSubmitting}
                            isLoading={isSubmitting}
                            className="h-12 rounded-xl bg-emerald-700 text-base font-semibold text-white hover:bg-emerald-800"
                        >
                            Register
                        </Button>
                    </form>

                    <div className="mt-6 flex items-center justify-between text-sm">
                        <Link href="/" className="text-slate-500 hover:text-emerald-700">
                            Back to home
                        </Link>

                        <p className="text-slate-500">
                            Already have an account?{" "}
                            <Link
                                href="/auth/login"
                                className="font-semibold text-emerald-700 hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </CardBody>
            </Card>
        </main>
    );
}