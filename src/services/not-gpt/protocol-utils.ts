import {
  NotGptAnswerSchema,
  type ClaimCluster,
  type EvidenceMatch,
  type NotGptAnswer,
  type SourceRecord
} from "@/schemas/not-gpt";

function canonicalizeClaim(claim: string) {
  const lowered = claim.toLowerCase();

  if (
    lowered.includes("tooth") ||
    lowered.includes("alignment") ||
    lowered.includes("bite") ||
    lowered.includes("occlusion")
  ) {
    return "Orthodontic treatment can change tooth alignment and bite relationships.";
  }

  if (
    lowered.includes("facial") ||
    lowered.includes("growth") ||
    lowered.includes("long-term") ||
    lowered.includes("harm")
  ) {
    return "The direct evidence for long-term facial development effects is narrower than many repeated claims.";
  }

  if (lowered.includes("consultation") || lowered.includes("recommended")) {
    return "Some sources recommend clinical consultation before treatment decisions.";
  }

  return claim.replace(/\s+/g, " ").trim();
}

export function clusterEquivalentClaims(sources: SourceRecord[]): ClaimCluster[] {
  const groups = new Map<string, SourceRecord[]>();

  for (const source of sources) {
    for (const claim of source.claims) {
      const canonical = canonicalizeClaim(claim);
      const existing = groups.get(canonical) ?? [];
      if (!existing.some((item) => item.id === source.id)) {
        existing.push(source);
      }
      groups.set(canonical, existing);
    }
  }

  return Array.from(groups.entries()).map(([canonicalClaim, groupedSources], index) => ({
    id: `cluster-${index + 1}`,
    canonicalClaim,
    repetitionCount: groupedSources.reduce((count, source) => {
      return count + source.claims.filter((claim) => canonicalizeClaim(claim) === canonicalClaim).length;
    }, 0),
    domainCount: new Set(groupedSources.map((source) => source.domain)).size,
    ownershipGroupCount: new Set(groupedSources.map((source) => source.ownership.group)).size,
    originalEvidenceCount: groupedSources.filter((source) => source.primarySource).length,
    sourceIds: groupedSources.map((source) => source.id),
    lineage: groupedSources.map((source) => ({
      sourceId: source.id,
      relationship: source.primarySource
        ? "Original evidence source"
        : source.citations.length > 0
          ? "Secondary source citing prior material"
          : "Unsupported or untraced repetition"
    }))
  }));
}

export function compareSourceToQuestion(source: SourceRecord, userQuestion: string): EvidenceMatch {
  const question = userQuestion.toLowerCase();
  const measured = source.studyMetadata.measuredOutcomes.join(", ") || source.sourceCategory;
  const asksFacialDevelopment = question.includes("facial") || question.includes("face");
  const measuresFacialProxy = measured.toLowerCase().includes("skeletal") || measured.toLowerCase().includes("appearance");
  const measuresDental = measured.toLowerCase().includes("tooth") || measured.toLowerCase().includes("bite");

  if (asksFacialDevelopment && measuresFacialProxy && measuresDental) {
    return {
      sourceId: source.id,
      measuredQuestion: measured,
      userQuestionMatch: "partial",
      mismatchNotes: [
        "The source measures dental or skeletal proxy outcomes rather than the full user concern.",
        "Applicability depends on treatment subtype and follow-up through growth completion."
      ]
    };
  }

  if (asksFacialDevelopment && measuresDental) {
    return {
      sourceId: source.id,
      measuredQuestion: measured,
      userQuestionMatch: "indirect",
      mismatchNotes: [
        "Tooth and bite outcomes are relevant, but they are not the same as long-term facial development."
      ]
    };
  }

  if (source.sourceCategory === "Forum or social discussion") {
    return {
      sourceId: source.id,
      measuredQuestion: "Personal testimony",
      userQuestionMatch: "mismatch",
      mismatchNotes: ["Personal testimony can raise a concern but cannot establish causation."]
    };
  }

  if (asksFacialDevelopment && source.sourceCategory === "Commercial service provider") {
    return {
      sourceId: source.id,
      measuredQuestion: measured,
      userQuestionMatch: "indirect",
      mismatchNotes: [
        "The source is a commercial explanation rather than direct evidence.",
        "Broad benefit wording should be traced to independent evidence before being relied on."
      ]
    };
  }

  return {
    sourceId: source.id,
    measuredQuestion: measured,
    userQuestionMatch: "partial",
    mismatchNotes: ["The source is relevant but does not fully answer every part of the question."]
  };
}

export function validateAnswerOrFallback(candidate: unknown, fallback: NotGptAnswer): NotGptAnswer {
  const parsed = NotGptAnswerSchema.safeParse(candidate);
  if (parsed.success) {
    return parsed.data;
  }

  return {
    ...fallback,
    materialUncertainties: [
      ...fallback.materialUncertainties,
      {
        id: "structured-generation-fallback",
        text: "The structured answer generator returned invalid data, so the system used a validated fallback answer.",
        whyItMatters:
          "This prevents malformed model output from being shown as if it were a trustworthy final answer.",
        sourceIds: []
      }
    ]
  };
}
