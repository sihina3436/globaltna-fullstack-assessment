"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CATEGORIES, STATUSES } from "@/features/jobs/constants";

export function JobsFiltersBar({
  category,
  status,
  searchInput,
  onChangeCategory,
  onChangeStatus,
  onChangeSearchInput,
  onSearch,
  onClear,
  hasFilters,
}: {
  category: string;
  status: string;
  searchInput: string;
  onChangeCategory: (v: string) => void;
  onChangeStatus: (v: string) => void;
  onChangeSearchInput: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
  hasFilters: boolean;
}) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white/85 backdrop-blur p-4 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[240px]">
          <label className="block text-xs font-bold text-gray-600 mb-1">Search</label>
          <div className="flex gap-2">
            <div className="relative w-full">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={16} />
              </span>
              <Input
                value={searchInput}
                onChange={(e) => onChangeSearchInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Title or description…"
                className="pl-9"
              />
            </div>
            <Button onClick={onSearch}>Go</Button>
          </div>
        </div>

        <div className="min-w-[200px]">
          <label className="block text-xs font-bold text-gray-600 mb-1">Category</label>
          <Select value={category} onChange={(e) => onChangeCategory(e.target.value)}>
            <option value="">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>

        <div className="min-w-[200px]">
          <label className="block text-xs font-bold text-gray-600 mb-1">Status</label>
          <Select value={status} onChange={(e) => onChangeStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </div>

        {hasFilters && (
          <Button variant="ghost" onClick={onClear} className="text-gray-700">
            <X size={16} />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}