import axios from "axios";
import { getToken } from "./auth";
import { Job, CreateJobDto, JobStatus, ApiResponse } from "@/types/job";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://globaltna-fullstack-assessment.vercel.app/";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const getAllJobs = async (
  category?: string,
  status?: string,
  search?: string
): Promise<Job[]> => {
  const params: Record<string, string> = {};
  if (category) params.category = category;
  if (status) params.status = status;
  if (search) params.search = search;

  const { data } = await api.get<ApiResponse<Job[]>>("/api/jobs", { params });
  return data.data ?? [];
};

export const getJobById = async (id: string): Promise<Job> => {
  const { data } = await api.get<ApiResponse<Job>>(`/api/jobs/${id}`);
  if (!data.data) throw new Error("Job not found");
  return data.data;
};

export const createJob = async (job: CreateJobDto): Promise<Job> => {
  const { data } = await api.post<ApiResponse<Job>>("/api/jobs", job);
  if (!data.data) throw new Error("Failed to create job");
  return data.data;
};

export const updateJobStatus = async (
  id: string,
  status: JobStatus
): Promise<Job> => {
  const { data } = await api.patch<ApiResponse<Job>>(`/api/jobs/${id}`, {
    status,
  });
  if (!data.data) throw new Error("Failed to update status");
  return data.data;
};

export const deleteJob = async (id: string): Promise<void> => {
  await api.delete(`/api/jobs/${id}`);
};