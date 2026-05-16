import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-sm transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 " +
    "disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]";

  const styles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-50",
    danger: "bg-white text-red-700 border border-red-200 hover:bg-red-50",
  };

  return <button className={cn(base, styles[variant], className)} {...props} />;
}