import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/AppShell";
// import CourseChatbot from "@/components/CourseChatbot";

export const metadata = {
  title: "TaskPilot AI",
  description: "AI-powered Gmail productivity app",
  icons: {
    icon: "/icon.png?v=3",
    shortcut: "/favicon.ico?v=3",
    apple: "/icon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          <AppShell>{children}</AppShell>
          {/* <CourseChatbot /> */}
        </Providers>
      </body>
    </html>
  );
}