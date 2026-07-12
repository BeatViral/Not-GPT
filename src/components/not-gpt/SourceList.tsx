import type { NotGptAnswer } from "@/schemas/not-gpt";
import { SourceCard } from "./SourceCard";

export function SourceList({ sources }: { sources: NotGptAnswer["sourceHighlights"] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">Sources</h2>
      <p className="mt-2 text-sm leading-6 text-ink/62">
        Prioritised sources used for this answer. Demo links use fictional illustrative URLs.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {sources.map((source) => (
          <SourceCard key={source.sourceId} source={source} />
        ))}
      </div>
    </section>
  );
}
