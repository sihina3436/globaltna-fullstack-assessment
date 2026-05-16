import { JobCategory, JobStatus } from "@/types/job";
import {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Ruler,
  type LucideIcon,
} from "lucide-react";

export const CATEGORIES: JobCategory[] = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Joinery",
  "Other",
];

export const STATUSES: JobStatus[] = ["Open", "In Progress", "Closed"];

/** Icon component per category */
export const CATEGORY_ICON: Record<JobCategory, LucideIcon> = {
  Plumbing: Wrench,
  Electrical: Zap,
  Painting: Paintbrush,
  Joinery: Ruler, // good "joinery/measure" representation
  Other: Hammer,
};