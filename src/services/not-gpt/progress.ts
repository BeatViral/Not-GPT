import type { PublicProgressStage } from "@/schemas/not-gpt";

export const publicProgressStages: PublicProgressStage[] = [
  { id: "understanding", label: "Understanding your question", status: "pending" },
  { id: "original-evidence", label: "Finding original evidence", status: "pending" },
  { id: "repetition", label: "Checking repeated claims", status: "pending" },
  { id: "incentives", label: "Examining source incentives", status: "pending" },
  { id: "contradictions", label: "Looking for credible contradictions", status: "pending" },
  { id: "uncertainty", label: "Identifying uncertainty", status: "pending" },
  { id: "answer", label: "Building your answer", status: "pending" }
];

export function markStage(
  stages: PublicProgressStage[],
  stageId: string,
  status: PublicProgressStage["status"],
  summary?: string
) {
  return stages.map((stage) =>
    stage.id === stageId
      ? {
          ...stage,
          status,
          summary
        }
      : stage
  );
}
