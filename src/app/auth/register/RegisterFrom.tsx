'use client';

import React from 'react'
import { Card, CardHeader, CardBody, Input, Button } from '@nextui-org/react';


export default function RegisterFrom() {
    return (
        <Card className='mt-16 w-full max-w-md mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-slate-700'>
                    <h1 className='text-2xl font-semibold'>Register</h1>
                    <p className='text-neutral-500'>Create a new account</p>
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <div className='space-y-4'>
                        <Input
                            label='Name'
                            variant='bordered'
                        />
                        <Input
                            label='Email'
                            variant='bordered'
                        />
                        <Input
                            label='Password'
                            type='password'
                            variant='bordered'
                        />
                        <Button fullWidth
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
