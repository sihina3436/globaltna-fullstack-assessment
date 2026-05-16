"use client";

import { motion } from "framer-motion";
import JobCard from "@/components/JobCard";
import { Job } from "@/types/job";

export function JobsGrid({ jobs }: { jobs: Job[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <p className="text-sm text-gray-500 mb-4">
        {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>
    </motion.div>
  );
}