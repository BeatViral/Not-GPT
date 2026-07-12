import { describe, expect, it } from "vitest";
import { demoContradictions, demoEvidenceMatches, demoSources } from "@/data/not-gpt-demo";
import { createDemoNotGptAnswer } from "@/services/not-gpt/demo-answer";
import {
  clusterEquivalentClaims,
  compareSourceToQuestion,
  validateAnswerOrFallback
} from "@/services/not-gpt/protocol-utils";
import { runNotGptInvestigation } from "@/services/not-gpt/pipeline";

describe("NOT GPT protocol", () => {
  it("does not count repeated webpages as independent evidence", () => {
    const clusters = clusterEquivalentClaims(demoSources);
    const repeated = clusters.find((cluster) => cluster.repetitionCount > cluster.originalEvidenceCount);

    expect(repeated).toBeDefined();
    expect(repeated?.originalEvidenceCount).toBeLessThan(repeated?.repetitionCount ?? 0);
  });

  it("keeps source type and incentive separate", () => {
    const commercial = demoSources.find((source) => source.id === "src-commercial-clinic");

    expect(commercial?.sourceCategory).toBe("Commercial service provider");
    expect(commercial?.incentiveCategory).toBe("Direct financial incentive");
  });

  it("does not automatically reject commercial sources", async () => {
    const answer = await runNotGptInvestigation({
      question: "My child is 12 years old. Could getting braces at this age affect her facial development?"
    });

    expect(answer.sourceHighlights.some((source) => source.sourceId === "src-commercial-clinic")).toBe(true);
  });

  it("weights contradictory evidence by quality", () => {
    expect(demoContradictions.every((contradiction) => contradiction.quality)).toBe(true);
    expect(demoContradictions.some((contradiction) => contradiction.quality === "limited")).toBe(true);
  });

  it("detects evidence-question mismatches", () => {
    const forumMatch = demoEvidenceMatches.find((match) => match.sourceId === "src-parent-forum");
    const generated = compareSourceToQuestion(
      demoSources.find((source) => source.id === "src-commercial-clinic")!,
      "Could braces affect facial development?"
    );

    expect(forumMatch?.userQuestionMatch).toBe("mismatch");
    expect(generated.userQuestionMatch).toBe("indirect");
  });

  it("keeps final answer claims traceable to source records", () => {
    const answer = createDemoNotGptAnswer("Could braces affect facial development?", []);
    const sourceIds = new Set(demoSources.map((source) => source.id));

    for (const finding of answer.confidentFindings) {
      expect(finding.sourceIds.every((id) => sourceIds.has(id))).toBe(true);
    }
  });

  it("handles invalid structured generation with a validated fallback", () => {
    const fallback = createDemoNotGptAnswer("Could braces affect facial development?", []);
    const answer = validateAnswerOrFallback({ directAnswer: 42 }, fallback);

    expect(answer.materialUncertainties.some((item) => item.id === "structured-generation-fallback")).toBe(true);
  });

  it("labels demonstration answers clearly", async () => {
    const answer = await runNotGptInvestigation({
      question: "My child is 12 years old. Could getting braces at this age affect her facial development?"
    });

    expect(answer.isDemo).toBe(true);
    expect(answer.methodologySummary.limitations.join(" ")).toContain("Illustrative demonstration data");
  });

  it("does not let GOO data enter the answer pipeline", async () => {
    const answer = await runNotGptInvestigation({
      question: "My child is 12 years old. Could getting braces at this age affect her facial development?"
    });
    const serialized = JSON.stringify(answer);

    expect(serialized).not.toContain("Truth Sachet");
    expect(serialized).not.toContain("Reverse Car Market");
    expect(serialized).not.toContain("Law On Demand");
  });
});
