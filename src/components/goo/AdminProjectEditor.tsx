"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import type { GooProject } from "@/schemas/goo";
import { InterestStatus } from "./InterestStatus";

export function AdminProjectEditor({ projects }: { projects: GooProject[] }) {
  const [message, setMessage] = useState<string | null>(null);
  const first = projects[0];

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h1 className="text-2xl font-semibold text-ink">Project editor</h1>
      <p className="mt-2 text-sm leading-6 text-ink/65">
        Create, edit, publish, unpublish and configure public metadata for Founder Lab projects.
      </p>
      <form
        className="mt-5 grid gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Demo project draft validated. Connect Supabase storage to persist this edit.");
        }}
      >
        <Field label="Name" defaultValue={first?.name ?? ""} />
        <Field label="Slug" defaultValue={first?.slug ?? ""} />
        <Field label="Category" defaultValue={first?.category ?? ""} />
        <Field label="Stage" defaultValue={first?.stage ?? ""} />
        <label className="grid gap-1 text-sm font-semibold text-ink">
          Full description
          <textarea
            defaultValue={first?.fullDescription ?? ""}
            rows={5}
            className="rounded-lg border border-line bg-paper px-3 py-3 font-normal"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-line bg-paper p-3 text-sm font-semibold">
          <input type="checkbox" defaultChecked={first?.published} className="h-4 w-4" />
          Published
        </label>
        {message && <InterestStatus message={message} />}
        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper">
          <Save aria-hidden="true" size={16} />
          Validate project draft
        </button>
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
