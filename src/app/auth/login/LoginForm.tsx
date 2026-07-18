'use client';

// import React from 'react'
import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, loginSchema } from '@/lib/schemas/loginSchema';
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
export default function LoginForm() {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'

    });

    const onSubmit = async (data: LoginSchema) => {
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
    };


    return (
        <Card className='mt-16 w-full max-w-md mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-slate-700'>
                    <div className='flex  flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-2xl font-semibold'>Login</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome back to TaskPilotAI! </p>

                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue=''
                            label='Email'
                            type="email"
                            autoComplete="email"
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />

                        {/* <Input
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
                        /> */}

                        {/* <Input
                            defaultValue=''
                            label='Password'
                            type='password'
                            autoComplete="current-password"
                            variant='bordered'
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message as string}
                        /> */}

                        {/* <Input
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
                        /> */}

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
                            isDisabled={!isValid}
                            fullWidth
                            type="submit"
                            className="bg-emerald-600 text-white hover:bg-emerald-700">
                            Login
                        </Button>

                        <p className='text-neutral-500'> New User?
                            <a href='/auth/register' className='text-emerald-600 hover:underline'>Register here</a></p>
                    </div>

                </form>
            </CardBody>
        </Card>
    )
}
