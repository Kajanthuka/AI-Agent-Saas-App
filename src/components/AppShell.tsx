// "use client";

// import { usePathname } from "next/navigation";
// import TopNav from "@/components/navbar/TopNav";
// import SideNav from "@/components/navbar/SideNav";

// export default function AppShell({ children }: { children: React.ReactNode }) {
//     const pathname = usePathname();

//     const isAuthPage =
//         pathname.startsWith("/auth/login") ||
//         pathname.startsWith("/auth/register");

//     if (isAuthPage) {
//         return <>{children}</>;
//     }

//     return (
//         <>
//             <TopNav />
//             <div className="flex">
//                 <SideNav />
//                 <div className="flex-1">{children}</div>
//             </div>
//         </>
//     );
// }

// "use client";

// import { usePathname } from "next/navigation";
// import TopNav from "@/components/navbar/TopNav";
// import SideNav from "@/components/navbar/SideNav";
// import Footer from "@/components/footer/Footer";

// export default function AppShell({ children }: { children: React.ReactNode }) {
//     const pathname = usePathname();

//     const isAuthPage =
//         pathname.startsWith("/auth/login") ||
//         pathname.startsWith("/auth/register");

//     if (isAuthPage) {
//         return <>{children}</>;
//     }

//     return (
//         <div className="min-h-screen bg-gray-50">
//             <TopNav />

//             <div className="flex pt-0">
//                 <SideNav />

//                 <main className="min-w-0 flex-1 p-6">
//                     {children}
//                 </main>
//             </div>

//             <Footer />
//         </div>
//     );
// }

"use client";

import TopNav from "@/components/navbar/TopNav";
import SideNav from "@/components/navbar/SideNav";
import Footer from "@/components/footer/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <TopNav />

            <div className="flex pt-0">
                <SideNav />

                <main className="min-w-0 flex-1 p-6">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}