import { JobStatus } from "@/types/job";

const STATUS_STYLES: Record<JobStatus, string> = {
  Open: "bg-emerald-100 text-emerald-800 border border-emerald-200",
  "In Progress": "bg-indigo-100 text-indigo-800 border border-indigo-200",
  Closed: "bg-gray-100 text-gray-700 border border-gray-200",
};

export default function StatusBadge({ status, className = "" }: { status: JobStatus; className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border",
        STATUS_STYLES[status],
        className,
      ].join(" ")}
    >
      <span
        className={[
          "w-1.5 h-1.5 rounded-full",
          status === "Open" ? "bg-emerald-500" : status === "In Progress" ? "bg-indigo-500" : "bg-gray-400",
        ].join(" ")}
      />
      {status}
    </span>
  );
}