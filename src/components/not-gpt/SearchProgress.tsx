import { CheckCircle2, Circle, Loader2, XCircle } from "lucide-react";
import type { PublicProgressStage } from "@/schemas/not-gpt";

export function SearchProgress({ stages, active }: { stages: PublicProgressStage[]; active: boolean }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5" aria-live="polite">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-ink">Evidence protocol</h2>
        <span className="text-sm text-ink/55">{active ? "Working" : "Completed"}</span>
      </div>
      <ol className="mt-4 grid gap-3 sm:grid-cols-2">
        {stages.map((stage) => (
          <li key={stage.id} className="flex gap-3 rounded-lg border border-line bg-paper p-3">
            <span className="mt-0.5 text-signal">
              {stage.status === "completed" && <CheckCircle2 aria-hidden="true" size={18} />}
              {stage.status === "active" && <Loader2 aria-hidden="true" className="animate-spin" size={18} />}
              {stage.status === "pending" && <Circle aria-hidden="true" size={18} />}
              {stage.status === "failed" && <XCircle aria-hidden="true" size={18} />}
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{stage.label}</span>
              {stage.summary && <span className="mt-1 block text-sm leading-6 text-ink/62">{stage.summary}</span>}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
