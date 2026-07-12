import type { EvidenceMatch } from "@/schemas/not-gpt";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function EvidenceMatchAudit({ matches }: { matches: EvidenceMatch[] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h3 className="text-lg font-semibold text-ink">Evidence-question match</h3>
      <div className="mt-4 space-y-3">
        {matches.map((match) => (
          <article key={match.sourceId} className="rounded-lg border border-line bg-paper p-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-ink">{match.sourceId}</span>
              <StatusBadge tone={match.userQuestionMatch === "mismatch" ? "danger" : "info"}>
                {match.userQuestionMatch}
              </StatusBadge>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/65">{match.measuredQuestion}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-ink/68">
              {match.mismatchNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
