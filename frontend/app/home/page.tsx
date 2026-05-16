"use client";
// hooks
import { useMemo, useState } from "react";
// Icons
import { Briefcase } from "lucide-react";
// Components
import { JobsFiltersBar } from "@/features/jobs/components/JobsFiltersBar";
import { JobsGrid } from "@/features/jobs/components/JobsGrid";
import { useJobsQuery } from "@/features/jobs/hooks/useJobsQuery";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

// Home Page Component
export default function HomePage() {
  // State for filters and search
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Fetch jobs using custom hook
  const { jobs, loading, error, fetchJobs, hasFilters } = useJobsQuery({
    category,
    status,
    search,
  });

  // Handlers for search and clear actions
  const onSearch = () => setSearch(searchInput);

  const onClear = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setStatus("");
  };

  // Memoized empty state component
  const emptyState = useMemo(() => {
    if (loading || error || jobs.length > 0) return null;

    return (
      // Empty state container
      <div className="text-center py-14">
        {/* Empty state icon */}
        <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600">
          <Briefcase size={18} />
        </div>
        {/* Main message */}
        <p className="font-extrabold text-gray-900">No jobs found</p>
        {/* Secondary message */}
        <p className="text-sm mt-1 text-gray-500">
          {hasFilters ? "Try clearing your filters." : "Be the first to post a job request."}
        </p>

        {/* Clear filters button */}
        {hasFilters ? (
          <div className="mt-4 flex justify-center">
            <Button variant="secondary" onClick={onClear}>
              Clear filters
            </Button>
          </div>
        ) : null}
      </div>
    );
  }, [loading, error, jobs.length, hasFilters]);

  return (
    // Main container
    <div className="w-full">
      {/* Page header */}
      <div className="mb-6">
        {/* Page title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          Service Requests
        </h1>
        {/* Page description */}
        <p className="text-sm text-gray-500 mt-2">
          Browse jobs or post a new request for tradespeople.
        </p>
      </div>

       {/* Filters bar */}
      <div className="mb-6">
        <JobsFiltersBar
          category={category}
          status={status}
          searchInput={searchInput}
          onChangeCategory={setCategory}
          onChangeStatus={setStatus}
          onChangeSearchInput={setSearchInput}
          onSearch={onSearch}
          onClear={onClear}
          hasFilters={hasFilters}
        />
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white/70 p-5">
            <Skeleton className="h-4 w-1/2 mb-3" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white/70 p-5">
            <Skeleton className="h-4 w-1/2 mb-3" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white/70 p-5">
            <Skeleton className="h-4 w-1/2 mb-3" />
            <Skeleton className="h-5 w-5/6 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ) : error ? (
        // Error state
        <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 font-medium">
          <div className="flex items-center justify-between gap-3">
            {/* Error Message */}
            <span>{error}</span>
            {/* Retry button */}
            <Button variant="secondary" onClick={fetchJobs}>
              Retry
            </Button>
          </div>
        </div>
      ) : jobs.length === 0 ? (
        emptyState
      ) : (
        // Display jobs grid
        <JobsGrid jobs={jobs} />
      )}
    </div>
  );
}