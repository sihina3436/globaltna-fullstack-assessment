"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJob } from "@/lib/api";
import { CreateJobDto, JobCategory } from "@/types/job";

const CATEGORIES: JobCategory[] = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

type FormErrors = Partial<Record<keyof CreateJobDto, string>>;

function inputClass(hasError: boolean) {
  return [
    "w-full text-sm rounded-xl px-3 py-2.5 border shadow-sm bg-white text-gray-900",
    "placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition",
    hasError ? "border-red-300" : "border-gray-200 hover:border-gray-300",
  ].join(" ");
}

function buttonPrimaryClass() {
  return [
    "flex-1 sm:flex-none",
    "rounded-xl",
    "bg-blue-600 hover:bg-blue-700",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "text-white font-semibold text-sm",
    "px-6 py-2.5",
    "shadow-sm",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2",
    "transition",
  ].join(" ");
}

function buttonSecondaryClass() {
  return [
    "flex-1 sm:flex-none",
    "rounded-xl",
    "border border-gray-200 bg-white text-gray-800",
    "hover:bg-gray-50",
    "font-semibold text-sm",
    "px-6 py-2.5",
    "shadow-sm",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:ring-offset-2",
    "transition",
  ].join(" ");
}

export default function JobForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const [form, setForm] = useState<CreateJobDto>({
    title: "",
    description: "",
    category: "Plumbing",
    location: "",
    contactName: "",
    contactEmail: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (form.title.trim().length > 100) e.title = "Title must be under 100 characters";
    if (!form.description.trim()) e.description = "Description is required";
    if (form.contactEmail && !/^\S+@\S+\.\S+$/.test(form.contactEmail)) {
      e.contactEmail = "Enter a valid email address";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError("");
    try {
      const job = await createJob(form);
      router.push(`/jobs/${job._id}`);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Something went wrong. Please try again.";
      setServerError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const set = (key: keyof CreateJobDto, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl shadow-sm">
          {serverError}
        </div>
      )}

      <FormField label="Job Title" required error={errors.title}>
        <input
          type="text"
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Leaking kitchen tap needs fixing"
          className={inputClass(!!errors.title)}
        />
      </FormField>

      <FormField label="Description" required error={errors.description}>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe the work needed in as much detail as possible…"
          className={inputClass(!!errors.description)}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Category" error={errors.category}>
          <select
            value={form.category}
            onChange={(e) => set("category", e.target.value as JobCategory)}
            className={inputClass(false)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Location" error={errors.location}>
          <input
            type="text"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="e.g. Glasgow"
            className={inputClass(false)}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Your Name" error={errors.contactName}>
          <input
            type="text"
            value={form.contactName}
            onChange={(e) => set("contactName", e.target.value)}
            placeholder="Full name"
            className={inputClass(false)}
          />
        </FormField>

        <FormField label="Your Email" error={errors.contactEmail}>
          <input
            type="email"
            value={form.contactEmail}
            onChange={(e) => set("contactEmail", e.target.value)}
            placeholder="you@example.com"
            className={inputClass(!!errors.contactEmail)}
          />
        </FormField>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className={buttonPrimaryClass()}>
          {submitting ? "Posting…" : "Post Request"}
        </button>
        <button type="button" onClick={() => router.push("/")} className={buttonSecondaryClass()}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="text-red-600 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
}