"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getAllJobs } from "@/lib/api";
import { Job } from "@/types/job";

export function useJobsQuery(filters: {
  category?: string;
  status?: string;
  search?: string;
}) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { category, status, search } = filters;

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllJobs(
        category || undefined,
        status || undefined,
        search || undefined
      );
      setJobs(data);
    } catch {
      setError("Could not load jobs. Make sure the backend is running on port 5000.");
    } finally {
      setLoading(false);
    }
  }, [category, status, search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const hasFilters = useMemo(() => Boolean(category || status || search), [category, status, search]);

  return { jobs, loading, error, fetchJobs, hasFilters };
}