"use client";

import { useState } from "react";
import { FlaskConical } from "lucide-react";
import type { GooMatchResult } from "@/schemas/goo";
import { ErrorState } from "@/components/shared/ErrorState";
import { MatchExplanation } from "./MatchExplanation";

const sampleProfile = {
  organisationType: "research institute",
  currentRole: "research lead",
  geography: "Australia",
  capabilities: ["evidence synthesis", "study design", "public communication", "AI evaluation"],
  availability: "2 hours per week",
  constraints: []
};

export function GooMatchLab() {
  const [profile, setProfile] = useState(JSON.stringify(sampleProfile, null, 2));
  const [results, setResults] = useState<GooMatchResult[]>([]);
  const [candidateCount, setCandidateCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function runMatch() {
    setError(null);
    const parsed = JSON.parse(profile) as unknown;
    const response = await fetch("/api/goo/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ principal: parsed })
    });
    const json = (await response.json()) as {
      matches?: GooMatchResult[];
      candidateCount?: number;
      error?: string;
    };

    if (!response.ok) {
      setError(json.error ?? "Match failed.");
      return;
    }

    setResults(json.matches ?? []);
    setCandidateCount(json.candidateCount ?? 0);
  }

  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <div className="flex items-start gap-3">
        <FlaskConical aria-hidden="true" className="mt-1 text-signal" size={22} />
        <div>
          <h1 className="text-2xl font-semibold text-ink">GOO match lab</h1>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Test hard filters, candidates considered, exclusions, match reasons, missing data and ranking without
            touching the NOT GPT answer pipeline.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <label className="grid gap-2 text-sm font-semibold text-ink">
          Principal profile JSON
          <textarea
            value={profile}
            onChange={(event) => setProfile(event.target.value)}
            rows={18}
            className="rounded-lg border border-line bg-paper p-3 font-mono text-xs font-normal leading-6"
          />
        </label>
        <div>
          <button
            type="button"
            onClick={runMatch}
            className="inline-flex items-center justify-center rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper"
          >
            Run match
          </button>
          <p className="mt-3 text-sm text-ink/55">{candidateCount} candidates considered</p>
          {error && <div className="mt-4"><ErrorState title="Match failed" body={error} /></div>}
          <div className="mt-4 space-y-3">
            {results.map((result) => (
              <MatchExplanation key={result.opportunityId} result={result} />
            ))}
            {!error && results.length === 0 && candidateCount > 0 && (
              <p className="rounded-lg border border-line bg-paper p-4 text-sm text-ink/65">
                No relevant match. The profile may be missing required capabilities or geography.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
