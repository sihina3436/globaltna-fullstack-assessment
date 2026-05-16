import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobalTNA — Service Request Board",
  description: "Browse and post home service requests across the UK",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group" aria-label="Go to home page">
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  Global<span className="text-gray-900">TNA</span>
                </span>
                <span className="hidden sm:block text-sm text-gray-400 border-l border-gray-200 pl-3 group-hover:text-blue-600 transition">
                  Service Requests
                </span>
              </Link>

              <Link
                href="/jobs/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm active:scale-[0.99] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Post a Job</span>
                <span className="sm:hidden">Post</span>
              </Link>
            </div>
          </header>

          <main className="grow flex flex-col items-center justify-start px-3 sm:px-6 py-10">
            <section className="w-full max-w-5xl rounded-3xl border border-gray-200 bg-white/70 backdrop-blur shadow-sm px-4 sm:px-8 py-8 sm:py-10">
              {children}
            </section>
          </main>

          <footer className="border-t border-gray-200 bg-white/70 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} GlobalTNA  Assessment. Built by Sihina Nimnada.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}