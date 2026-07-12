"use client";

import { Share2 } from "lucide-react";
import type { NotGptAnswer } from "@/schemas/not-gpt";
import { CopyButton } from "@/components/shared/CopyButton";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ShareDialog } from "./ShareDialog";

function plainAnswer(answer: NotGptAnswer) {
  return [
    answer.directAnswer,
    "What we can say confidently:",
    ...answer.confidentFindings.map((finding) => `- ${finding.text}`),
    "What remains uncertain:",
    ...answer.materialUncertainties.map((uncertainty) => `- ${uncertainty.text}`)
  ].join("\n\n");
}

export function AnswerHeader({ answer }: { answer: NotGptAnswer }) {
  return (
    <div className="rounded-lg border border-line bg-white p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={answer.isDemo ? "warn" : "good"}>
              {answer.isDemo ? "Demonstration answer" : "Live answer"}
            </StatusBadge>
            <StatusBadge tone="info">{answer.category}</StatusBadge>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-ink">{answer.interpretedQuestion}</h2>
          <p className="mt-2 text-sm text-ink/55">Created {new Date(answer.createdAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={plainAnswer(answer)} label="Copy answer" />
          <CopyButton
            text={answer.sourceHighlights.map((source) => `${source.title} - ${source.url}`).join("\n")}
            label="Copy sources"
          />
          <ShareDialog answer={answer}>
            <span className="inline-flex items-center gap-2">
              <Share2 aria-hidden="true" size={16} />
              Share
            </span>
          </ShareDialog>
        </div>
      </div>
    </div>
  );
}
