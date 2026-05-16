interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

// ErrorMessage Component
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl px-4 py-4 flex items-start gap-3 shadow-sm">
      <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
      <div className="flex-1">
        <p className="text-sm text-red-700 font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center text-xs text-red-700 font-semibold underline underline-offset-4 hover:no-underline"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}