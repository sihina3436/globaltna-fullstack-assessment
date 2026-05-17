import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/Header";

export const metadata: Metadata = {
  title: "GlobalTNA — Service Request Board",
  description: "Browse and post home service requests ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="min-h-screen h-full bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-900">
        <div className="min-h-screen flex flex-col">
          <AppHeader />
          <main className="grow flex flex-col items-center justify-start px-3 sm:px-6 py-10">
            <section className="w-full max-w-5xl rounded-3xl border border-gray-200 bg-white/70 backdrop-blur shadow-sm px-4 sm:px-8 py-8 sm:py-10">
              {children}
            </section>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} GlobalTNA Assessment. Built by Sihina Nimnada.
      </div>
    </footer>
  );
}