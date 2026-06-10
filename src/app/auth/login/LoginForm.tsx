'use client';

import React from 'react'
import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';
import { GiPadlock } from 'react-icons/gi';
import { useForm } from 'react-hook-form';


export default function LoginForm() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    }


    return (
        <Card className='mt-16 w-full max-w-md mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-slate-700'>
                    <div className='flex  flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-2xl font-semibold'>Login</h1>
                    </div>
                    <p className='text-neutral-500'>Welcome back TaskPilotAI! This is Ai Platform </p>

                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            {...register('email')}
                        />
                        <Input
                            defaultValue=''
                            label='Password'
                            type='password'
                            variant='bordered'
                            {...register('password')}
                        />
                        <Button fullWidth
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
