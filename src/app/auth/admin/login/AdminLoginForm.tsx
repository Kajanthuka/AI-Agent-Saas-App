"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { LoginSchema, loginSchema } from "@/lib/schemas/loginSchema";

export default function AdminLoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: "onTouched",
    });

    const onSubmit = async (data: LoginSchema) => {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                requiredRole: "admin",
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            alert(result.error ?? "Admin login failed");
            return;
        }

        router.push("/dashboard");
        router.refresh();
    };

    return (
        <div className="mx-auto w-full max-w-md">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <ShieldCheck size={34} />
                </div>

                <h2 className="text-3xl font-bold text-slate-950">
                    Admin Login
                </h2>

                <p className="mt-3 text-slate-500">
                    Sign in with your admin account to continue.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                    label="Admin email"
                    type="email"
                    variant="bordered"
                    autoComplete="email"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message as string}
                />


                <Input
                    defaultValue=""
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="bordered"
                    {...register("password")}
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message as string}
                    endContent={
                        <button
                            type="button"
                            onClick={() => setShowPassword((current) => !current)}
                            className="text-slate-500 hover:text-emerald-700"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    }
                />

                <Button
                    fullWidth
                    type="submit"
                    isDisabled={!isValid || isSubmitting}
                    isLoading={isSubmitting}
                    className="h-12 bg-emerald-700 text-base font-semibold text-white hover:bg-emerald-800"
                >
                    Login as Admin
                </Button>
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