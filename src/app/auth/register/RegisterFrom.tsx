'use client';

import React from 'react'
import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterSchema } from '@/lib/schemas/registerSchema';


export default function RegisterFrom() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'

    });
    const onSubmit = (data: RegisterSchema) => {
        console.log(data);
    }


    return (
        <Card className='mt-16 w-full max-w-md mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-slate-700'>
                    <div className='flex  flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-2xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome to TaskPilotAI! </p>

                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>


                        <Input
                            defaultValue=''
                            label='Name'
                            name="name"
                            autoComplete="name"
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />

                        <Input
                            defaultValue=''
                            label='Email'
                            name="email"
                            type="email"
                            autoComplete="email"
                            variant='bordered'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            defaultValue=''
                            label='Password'
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            variant='bordered'
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <Button
                            isDisabled={!isValid}
                            fullWidth
                            type="submit"
                            className="bg-emerald-600 text-white hover:bg-emerald-700">
                            Register
                        </Button>

                    </div>

                </form>
            </CardBody>
        </Card>
    )
}
