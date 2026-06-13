import React from 'react'
import Link from "next/link";


export default function FooterPage() {
    return (

        <footer className="border-t border-slate-200 bg-white px-4 py-5">
            <div
                className=" bg-linear-to-b bg-emerald-900 h-24 max-w-7xl text-white flex-col rounded-2xl  px-6 shadow-sm"
            >
                <p className="text-center text-lg text-gray-100 px-2 py-8">
                    © {new Date().getFullYear()} TaskPilot AI. All rights reserved.
                </p>

                <nav className="flex flex-wrap  gap-4">
                    <Link href="/privacy" className="hover:text-slate-900">
                        Privacy
                    </Link>
                </nav>
            </div>
        </footer>


    )
}
