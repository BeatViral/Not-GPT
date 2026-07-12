"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import type { NotGptAnswer } from "@/schemas/not-gpt";
import { ContradictionAudit } from "./ContradictionAudit";
import { EvidenceMatchAudit } from "./EvidenceMatchAudit";
import { IncentiveAudit } from "./IncentiveAudit";
import { MissingQuestionsAudit } from "./MissingQuestionsAudit";
import { RepetitionAudit } from "./RepetitionAudit";
import { SourceIngredientBreakdown } from "./SourceIngredientBreakdown";

export function AnswerAuditDrawer({ answer }: { answer: NotGptAnswer }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-3 text-sm font-semibold text-ink hover:bg-ink/5"
      >
        See how this answer was built
        <ChevronRight aria-hidden="true" size={16} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/35" role="presentation">
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-title"
            className="ml-auto h-full w-full max-w-2xl overflow-auto bg-paper p-5 shadow-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-line bg-paper pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-moss">Answer audit</p>
                <h2 id="audit-title" className="mt-1 text-2xl font-semibold text-ink">
                  How this answer was built
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-ink/65 hover:bg-ink/10"
                aria-label="Close answer audit"
              >
                <X aria-hidden="true" size={18} />
              </button>
            </div>
            <div className="space-y-5 py-5">
              <SourceIngredientBreakdown ingredients={answer.audit.ingredients} />
              <RepetitionAudit clusters={answer.audit.claimClusters} />
              <IncentiveAudit incentives={answer.audit.incentives} />
              <EvidenceMatchAudit matches={answer.audit.evidenceMatches} />
              <ContradictionAudit contradictions={answer.audit.contradictions} />
              <MissingQuestionsAudit questions={answer.audit.missingQuestions} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
