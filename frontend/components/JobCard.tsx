import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Job } from "@/types/job";
import StatusBadge from "./StatusBadge";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_ICON } from "@/features/jobs/constants";

export default function JobCard({ job }: { job: Job }) {
  const Icon = CATEGORY_ICON[job.category];

  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.15 }}>
      <Link
        href={`/jobs/${job._id}`}
        className="group block rounded-3xl border border-gray-200 bg-white/90 backdrop-blur p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition"
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
              <Icon size={18} />
            </span>
            <Badge className="text-gray-700">{job.category}</Badge>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <h2 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {job.title}
        </h2>

        <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
          {job.location ? (
            <span className="flex items-center gap-1">
              <MapPin size={14} className="text-gray-400" />
              {job.location}
            </span>
          ) : (
            <span />
          )}
          <span>{date}</span>
        </div>
      </Link>
    </motion.div>
  );
}