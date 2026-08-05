// import React from 'react'
// import LoginForm from './LoginForm';

// export default function LoginPage() {
//     return (

//         <div className="flex items-center justify-center">
//             <LoginForm />
//         </div>
//     )

// }

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <div className="flex items-center justify-center">
            <Suspense fallback={<LoginLoading />}>
                <LoginForm />
            </Suspense>
        </div>
    );
}

function LoginLoading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
            <div className="text-sm font-medium text-slate-500">
                Loading login...
            </div>
        </main>
    );
}