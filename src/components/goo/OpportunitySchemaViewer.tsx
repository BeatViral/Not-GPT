"use client";

import { useState } from "react";
import { Code2 } from "lucide-react";
import type { GooOpportunity } from "@/schemas/goo";

export function OpportunitySchemaViewer({ opportunity }: { opportunity: GooOpportunity }) {
  const [open, setOpen] = useState(false);

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:bg-ink/5"
      >
        <Code2 aria-hidden="true" size={16} />
        {open ? "Hide JSON" : "Show JSON"}
      </button>
      {open && (
        <pre className="mt-4 max-h-96 overflow-auto rounded-lg bg-ink p-4 text-xs leading-6 text-paper">
          {JSON.stringify(opportunity, null, 2)}
        </pre>
      )}
    </section>
  );
}
