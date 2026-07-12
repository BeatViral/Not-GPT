import type { NotGptAnswer } from "@/schemas/not-gpt";
import { AnswerAuditDrawer } from "./AnswerAuditDrawer";
import { AnswerHeader } from "./AnswerHeader";
import { ConfidentFindings } from "./ConfidentFindings";
import { DemoModeBanner } from "./DemoModeBanner";
import { DirectAnswer } from "./DirectAnswer";
import { HighStakesNotice } from "./HighStakesNotice";
import { MaterialUncertainty } from "./MaterialUncertainty";
import { SourceList } from "./SourceList";

export function AnswerRenderer({ answer }: { answer: NotGptAnswer }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0 space-y-6">
        {answer.isDemo && <DemoModeBanner />}
        <AnswerHeader answer={answer} />
        {answer.highStakesNotice && <HighStakesNotice notice={answer.highStakesNotice} />}
        <DirectAnswer answer={answer.directAnswer} />
        <ConfidentFindings findings={answer.confidentFindings} />
        <MaterialUncertainty uncertainties={answer.materialUncertainties} />
        <SourceList sources={answer.sourceHighlights} />
        <AnswerAuditDrawer answer={answer} />
      </div>
      <aside className="hidden rounded-lg border border-line bg-white p-5 lg:block">
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">Answer ingredients</h2>
        <dl className="mt-4 space-y-4">
          {answer.audit.ingredients.map((ingredient) => (
            <div key={ingredient.label}>
              <dt className="flex items-center justify-between gap-4 text-sm font-semibold">
                <span>{ingredient.label}</span>
                <span className="text-signal">{ingredient.count}</span>
              </dt>
              <dd className="mt-1 text-sm leading-6 text-ink/62">{ingredient.notes}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>
  );
}
