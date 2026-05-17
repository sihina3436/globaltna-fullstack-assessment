"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/lib/auth-api";
import { setToken } from "@/lib/auth";

export type AuthMode = "login" | "register";

export function useAuth() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleMode = useCallback(() => {
    setError("");
    setMode(m => (m === "login" ? "register" : "login"));
  }, []);

  const submit = useCallback(
    async (form: { name: string; email: string; password: string }) => {
      setError("");
      setLoading(true);
      try {
        const data =
          mode === "login"
            ? await login({ email: form.email, password: form.password })
            : await register(form);

        if (!data?.token) {
          setError(data?.message ?? "Missing token from server");
          return;
        }

        setToken(data.token);
        router.push("/home"); 
        router.refresh();
      } catch (err: unknown) {
        const msg =
          (err as { response?: { data?: { message?: string } } })?.response?.data
            ?.message ?? "Something went wrong";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [mode, router]
  );

  return { mode, loading, error, toggleMode, submit, setError };
}