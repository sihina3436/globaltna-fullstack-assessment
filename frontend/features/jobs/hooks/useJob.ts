"use client";

import { useEffect, useState } from "react";
import { getJobById } from "@/lib/api";
import { Job } from "@/types/job";

export function useJob(id: string) {
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    getJobById(id)
      .then(setJob)
      .catch(() => setError("Job not found or server error."))
      .finally(() => setLoading(false));
  }, [id]);

  return { job, setJob, loading, error };
}