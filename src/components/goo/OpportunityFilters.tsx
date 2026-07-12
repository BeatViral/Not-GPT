"use client";

import { Search, SlidersHorizontal } from "lucide-react";

export function OpportunityFilters({
  query,
  onQueryChange,
  remoteOnly,
  onRemoteOnlyChange
}: {
  query: string;
  onQueryChange: (value: string) => void;
  remoteOnly: boolean;
  onRemoteOnlyChange: (value: boolean) => void;
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search opportunities</span>
          <Search aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/45" size={17} />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search roles, capabilities or projects"
            className="w-full rounded-lg border border-line bg-paper py-3 pl-10 pr-3 text-sm focus:border-signal focus:bg-white focus:outline-none"
          />
        </label>
        <label className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-3 text-sm font-semibold">
          <SlidersHorizontal aria-hidden="true" size={16} />
          <input
            type="checkbox"
            checked={remoteOnly}
            onChange={(event) => onRemoteOnlyChange(event.target.checked)}
            className="h-4 w-4"
          />
          Remote
        </label>
      </div>
    </div>
  );
}
