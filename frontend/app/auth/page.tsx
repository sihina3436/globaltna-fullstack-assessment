"use client";
import { AuthForm } from "@/features/auth/components/AuthForm";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function AuthPage() {
  const { mode, loading, error, toggleMode, submit } = useAuth();

  return (
    <AuthForm
      mode={mode}
      loading={loading}
      error={error}
      onToggleMode={toggleMode}
      onSubmit={submit}
    />
  );
}