export type JobStatus = "Open" | "In Progress" | "Closed";

export type JobCategory =
  | "Plumbing"
  | "Electrical"
  | "Painting"
  | "Joinery"
  | "Other";

export interface Job {
  _id: string;
  title: string;
  description: string;
  category: JobCategory;
  location: string;
  contactName: string;
  contactEmail: string;
  status: JobStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobDto {
  title: string;
  description: string;
  category: JobCategory;
  location: string;
  contactName: string;
  contactEmail: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
}