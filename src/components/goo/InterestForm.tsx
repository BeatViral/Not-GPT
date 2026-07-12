"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { GooOpportunity } from "@/schemas/goo";
import { ErrorState } from "@/components/shared/ErrorState";
import { InterestStatus } from "./InterestStatus";

export function InterestForm({ opportunity }: { opportunity: GooOpportunity }) {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setStatus(null);

    const formData = new FormData(event.currentTarget);
    const capabilities = String(formData.get("capabilities") ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const response = await fetch(`/api/goo/opportunities/${opportunity.slug}/interest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        organisation: formData.get("organisation"),
        currentRole: formData.get("currentRole"),
        geography: formData.get("geography"),
        capabilities,
        reasonForInterest: formData.get("reasonForInterest"),
        proposedContribution: formData.get("proposedContribution"),
        availability: formData.get("availability"),
        links: [],
        consentToContact: formData.get("consentToContact") === "on"
      })
    });

    const json = (await response.json()) as { status?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(json.error ?? "Interest could not be submitted.");
      return;
    }

    setStatus(json.status ?? "Interest recorded for human review.");
    event.currentTarget.reset();
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h2 className="text-xl font-semibold text-ink">Express interest</h2>
      <p className="mt-2 text-sm leading-6 text-ink/65">
        Submissions go to human review. No role is awarded and no binding terms are accepted automatically.
      </p>
      <form className="mt-5 grid gap-4" onSubmit={submit}>
        <Field name="name" label="Name" required />
        <Field name="email" label="Email" type="email" required />
        <Field name="organisation" label="Organisation" />
        <Field name="currentRole" label="Current role" />
        <Field name="geography" label="Geography" required />
        <Field name="capabilities" label="Capabilities" placeholder="evidence synthesis, study design" required />
        <TextArea name="reasonForInterest" label="Reason for interest" required />
        <TextArea name="proposedContribution" label="Proposed contribution" required />
        <Field name="availability" label="Availability" required />
        <label className="flex gap-3 rounded-lg border border-line bg-paper p-3 text-sm text-ink/70">
          <input name="consentToContact" type="checkbox" className="mt-1 h-4 w-4" required />
          I consent to be contacted about this opportunity.
        </label>
        {error && <ErrorState title="Submission failed" body={error} />}
        {status && <InterestStatus message={status} />}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-ink/90 disabled:bg-ink/35"
        >
          <Send aria-hidden="true" size={16} />
          {loading ? "Submitting" : "Submit interest"}
        </button>
      </form>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-ink">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-line bg-paper px-3 py-3 font-normal focus:border-signal focus:bg-white focus:outline-none"
      />
    </label>
  );
}

function TextArea({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <label className="grid gap-1 text-sm font-semibold text-ink">
      {label}
      <textarea
        name={name}
        required={required}
        rows={4}
        className="rounded-lg border border-line bg-paper px-3 py-3 font-normal focus:border-signal focus:bg-white focus:outline-none"
      />
    </label>
  );
}
