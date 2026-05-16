"use client";
import Link from "next/link";
// navigation hooks
import { useParams, useRouter } from "next/navigation";
// Icons
import { ArrowLeft } from "lucide-react";
// react hooks
import { useState } from "react";
// API functions
import { deleteJob, updateJobStatus } from "@/lib/api";
// Types
import { JobStatus } from "@/types/job";
// Custom hook
import { useJob } from "@/features/jobs/hooks/useJob";
// Job Detail Page Component
import { JobDetailsCard } from "@/features/jobs/components/JobDetailsCard";

// Job Detail Page Component
export default function JobDetailPage() {
  //Get route parameters and navigation functions
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { job, setJob, loading, error } = useJob(id);

  // State for updating and deleting actions
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updateError, setUpdateError] = useState("");

  // Handler for changing job status
  const handleStatusChange = async (status: JobStatus) => {
    if (!job || updating) return;
    setUpdating(true);
    setUpdateError("");
    try {
      const updated = await updateJobStatus(id, status);
      setJob(updated);
    } catch {
      setUpdateError("Failed to update status.");
    } finally {
      setUpdating(false);
    }
  };

  // Handler for deleting the job
  const handleDelete = async () => {
    if (!confirm("Delete this job request? This cannot be undone.")) return;
    setDeleting(true);
    setUpdateError("");
    try {
      await deleteJob(id);
      router.push("/");
    } catch {
      setUpdateError("Failed to delete job.");
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      // Loading state
      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full text-sm text-gray-500">
          Loading job details…
        </div>
      </div>
    );
  }

  if (error) {
    return (
      // Error state
      <div className="w-full flex justify-center">
        <div className="max-w-2xl w-full rounded-3xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 font-medium">
          {error}
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    // Main container
    <div className="w-full min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={16} />
          Back to all jobs
        </Link>

        {/* Job Details Card */}
        <JobDetailsCard
          job={job}
          updating={updating}
          deleting={deleting}
          updateError={updateError}
          onChangeStatus={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}