"use client";

import Link from "next/link";
import { Plus, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function AppHeader() {
  const [logged, setLogged] = useState(false);
  const router = useRouter();

  useEffect(() => {

    setLogged(isLoggedIn());
    function update() { setLogged(isLoggedIn()); }
    window.addEventListener("storage", update);
    window.addEventListener("authEvent", update);

    return () => {
      window.removeEventListener("storage", update);
      window.removeEventListener("authEvent", update);
    };
  }, []);


  function handlePostJob(e: React.MouseEvent) {
    if (!logged) {
      e.preventDefault();
      alert("You must register or login to post a job!");
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-3 group" aria-label="Go to home page">
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            Global<span className="text-gray-900">TNA</span>
          </span>
          <span className="hidden sm:block text-sm text-gray-400 border-l border-gray-200 pl-3 group-hover:text-blue-600 transition">
            Service Requests
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {logged && (
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-blue-600 border border-blue-100 hover:bg-blue-50 transition font-semibold text-sm"
              type="button"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
          <Link
            href="/jobs/new"
            onClick={handlePostJob}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm active:scale-[0.99] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Post a Job</span>
            <span className="sm:hidden">Post</span>
          </Link>
        </div>
      </div>
    </header>
  );
}