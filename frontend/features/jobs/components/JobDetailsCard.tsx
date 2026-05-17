"use client";
import { motion } from "framer-motion";
import { CalendarDays, Mail, MapPin, Trash2, User } from "lucide-react";
import { Job, JobStatus } from "@/types/job";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import { Card, CardDivider, CardHeader } from "@/components/ui/Card";
import StatusBadge from "@/components/StatusBadge";
import { CATEGORY_ICON, STATUSES } from "@/features/jobs/constants";

export function JobDetailsCard({
  job,
  updating,
  deleting,
  updateError,
  onChangeStatus,
  onDelete,
}: {
  job: Job;
  updating: boolean;
  deleting: boolean;
  updateError: string;
  onChangeStatus: (s: JobStatus) => void;
  onDelete: () => void;
}) {
  const posted = new Date(job.createdAt).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const Icon = CATEGORY_ICON[job.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {updateError ? (
        <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {updateError}
        </div>
      ) : null}

      <Card className="overflow-hidden flex flex-col">
        <CardHeader className="pb-0">
          <div className="px-6 pt-6 pb-5">
            <div className="flex items-center gap-2 mb-3">
              {/* Category icon */}
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 border border-blue-100">
                <Icon size={20} />
              </span>

              <Badge>{job.category}</Badge>
              <StatusBadge status={job.status} />
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
              {job.title}
            </h1>
          </div>
        </CardHeader>

        <CardDivider />

        <div className="px-6 py-5">
          <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-wide mb-2">
            Description
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        <CardDivider />

        <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {job.location ? (
            <Detail icon={<MapPin size={16} />} label="Location" value={job.location} />
          ) : null}

          {job.contactName ? (
            <Detail icon={<User size={16} />} label="Contact" value={job.contactName} />
          ) : null}

          {job.contactEmail ? (
            <Detail
              icon={<Mail size={16} />}
              label="Email"
              value={
                <a
                  className="text-blue-600 hover:text-blue-800 hover:underline transition"
                  href={`mailto:${job.contactEmail}`}
                >
                  {job.contactEmail}
                </a>
              }
            />
          ) : null}

          <Detail icon={<CalendarDays size={16} />} label="Posted" value={posted} />
        </div>

        <CardDivider />

        <div className="px-6 py-4 flex flex-wrap items-center gap-3 bg-gray-50">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-gray-700">Status:</label>
            <Select
              value={job.status}
              onChange={(e) => onChangeStatus(e.target.value as JobStatus)}
              disabled={updating}
              className="w-[180px]"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
            {updating ? (
              <span className="text-xs text-gray-400 animate-pulse">Saving…</span>
            ) : null}
          </div>

          <Button
            variant="danger"
            className="ml-auto"
            onClick={onDelete}
            disabled={deleting}
          >
            <Trash2 size={16} />
            {deleting ? "Deleting…" : "Delete Job"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-gray-400 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs text-gray-400 font-bold">{label}</p>
        <div className="text-sm text-gray-800">{value}</div>
      </div>
    </div>
  );
}