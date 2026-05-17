"use client";
import React from "react";
type Props = {
  mode: "login" | "register";
  loading: boolean;
  error: string;
  onToggleMode: () => void;
  onSubmit: (form: { name: string; email: string; password: string }) => void;
};

export function AuthForm({
  mode,
  loading,
  error,
  onToggleMode,
  onSubmit,
}: Props) {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="max-w-md mx-auto">
      {/* Main Card */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-2xl p-8">
        
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-60" />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="mb-8 text-center">
          
            <div className="flex justify-center mb-5">
              <div className="h-2 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              {mode === "login"
                ? "Sign in to continue to your account"
                : "Create your account to get started"}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(form);
            }}
            className="space-y-5"
          >
            {/* Name */}
            {mode === "register" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  required
                  placeholder="Enter your full name"
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      name: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={form.email}
                required
                placeholder="Enter your email"
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    email: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                type="password"
                value={form.password}
                minLength={6}
                required
                placeholder="Enter your password"
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    password: e.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:scale-[1.01] hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Sign In"
                : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={onToggleMode}
              className="ml-1 font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
            >
              {mode === "login" ? "Register" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}