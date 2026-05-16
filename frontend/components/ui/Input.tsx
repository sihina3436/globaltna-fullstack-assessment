import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm " +
          "placeholder:text-gray-400 transition " +
          "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400",
        className
      )}
      {...props}
    />
  );
}