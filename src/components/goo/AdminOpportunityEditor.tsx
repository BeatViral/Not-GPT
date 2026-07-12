"use client";

import { useState } from "react";
import { Copy, Save } from "lucide-react";
import type { GooOpportunity } from "@/schemas/goo";
import { InterestStatus } from "./InterestStatus";

export function AdminOpportunityEditor({ opportunities }: { opportunities: GooOpportunity[] }) {
  const [selectedSlug, setSelectedSlug] = useState(opportunities[0]?.slug ?? "");
  const [message, setMessage] = useState<string | null>(null);
  const selected = opportunities.find((opportunity) => opportunity.slug === selectedSlug) ?? opportunities[0];

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h1 className="text-2xl font-semibold text-ink">Opportunity editor</h1>
      <p className="mt-2 text-sm leading-6 text-ink/65">
        Manage opportunity types, requirements, exclusions, geography, terms, status, agent permissions and duplication.
      </p>
      <form
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Demo opportunity draft validated. Connect Supabase to persist open, pause, fill, close and archive actions.");
        }}
      >
        <label className="grid gap-1 text-sm font-semibold text-ink">
          Opportunity
          <select
            value={selectedSlug}
            onChange={(event) => setSelectedSlug(event.target.value)}
            className="rounded-lg border border-line bg-paper px-3 py-3 font-normal"
          >
            {opportunities.map((opportunity) => (
              <option key={opportunity.slug} value={opportunity.slug}>
                {opportunity.title}
              </option>
            ))}
          </select>
        </label>
        <Field label="Title" defaultValue={selected?.title ?? ""} />
        <Field label="Role name" defaultValue={selected?.roleName ?? ""} />
        <Field label="Places available" defaultValue={String(selected?.placesRemaining ?? 0)} />
        <Field label="Required capabilities" defaultValue={selected?.requiredCapabilities.join(", ") ?? ""} />
        <Field label="Excluded fits" defaultValue={selected?.excludedFits.join(", ") ?? ""} />
        <label className="grid gap-1 text-sm font-semibold text-ink">
          Status
          <select defaultValue={selected?.status} className="rounded-lg border border-line bg-paper px-3 py-3 font-normal">
            <option value="open">Open</option>
            <option value="paused">Paused</option>
            <option value="filled">Filled</option>
            <option value="closed">Closed</option>
            <option value="archived">Archived</option>
          </select>
        </label>
        {message && <InterestStatus message={message} />}
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper">
            <Save aria-hidden="true" size={16} />
            Validate opportunity draft
          </button>
          <button
            type="button"
            onClick={() => setMessage("Duplicate draft created in memory for review.")}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-4 py-3 text-sm font-semibold"
          >
            <Copy aria-hidden="true" size={16} />
            Duplicate
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-ink">
      {label}
      <input defaultValue={defaultValue} className="rounded-lg border border-line bg-paper px-3 py-3 font-normal" />
    </label>
  );
}
