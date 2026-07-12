import { z } from "zod";

export const SourceCategorySchema = z.enum([
  "Peer-reviewed primary research",
  "Randomised controlled trial",
  "Observational study",
  "Systematic review",
  "Meta-analysis",
  "Professional guideline",
  "Government publication",
  "Official dataset",
  "University publication",
  "Academic commentary",
  "Professional association",
  "Commercial service provider",
  "Manufacturer",
  "Commercial publisher",
  "Advertising-supported publisher",
  "Affiliate publisher",
  "Journalism",
  "Non-profit organisation",
  "Advocacy organisation",
  "Personal testimony",
  "Forum or social discussion",
  "Unknown"
]);

export const IncentiveCategorySchema = z.enum([
  "Direct financial incentive",
  "Indirect financial incentive",
  "Professional alignment",
  "Institutional alignment",
  "Advertising incentive",
  "Affiliate incentive",
  "Advocacy position",
  "Public-service mandate",
  "No material incentive detected",
  "Unknown"
]);

export const SourceRecordSchema = z.object({
  id: z.string(),
  investigationId: z.string().optional(),
  url: z.string().url(),
  title: z.string(),
  author: z.string().optional(),
  publisher: z.string(),
  organisation: z.string().optional(),
  domain: z.string(),
  publicationDate: z.string().nullable(),
  updatedDate: z.string().nullable(),
  sourceCategory: SourceCategorySchema,
  incentiveCategory: IncentiveCategorySchema,
  primarySource: z.boolean(),
  claims: z.array(z.string()),
  citations: z.array(z.string()),
  outgoingReferences: z.array(z.string()),
  fundingDisclosures: z.array(z.string()),
  conflictsOfInterest: z.array(z.string()),
  ownership: z.object({
    owner: z.string(),
    group: z.string(),
    observations: z.array(z.string())
  }),
  studyMetadata: z.object({
    design: z.string().optional(),
    sample: z.string().optional(),
    measuredOutcomes: z.array(z.string()),
    followUp: z.string().optional(),
    limitations: z.array(z.string())
  }),
  classificationReasoning: z.object({
    observations: z.array(z.string()),
    uncertainty: z.string()
  }),
  classificationConfidence: z.number().min(0).max(1),
  commercialCallsToAction: z.array(z.string())
});

export const AnswerFindingSchema = z.object({
  id: z.string(),
  text: z.string(),
  supportLevel: z.enum(["strong", "moderate", "limited", "indirect"]),
  sourceIds: z.array(z.string()).min(1)
});

export const AnswerUncertaintySchema = z.object({
  id: z.string(),
  text: z.string(),
  whyItMatters: z.string(),
  sourceIds: z.array(z.string())
});

export const SourceHighlightSchema = z.object({
  sourceId: z.string(),
  title: z.string(),
  publisher: z.string(),
  date: z.string().nullable(),
  url: z.string().url(),
  sourceCategory: SourceCategorySchema,
  incentiveCategory: IncentiveCategorySchema,
  whyUsed: z.string()
});

export const ClaimClusterSchema = z.object({
  id: z.string(),
  canonicalClaim: z.string(),
  repetitionCount: z.number().int().nonnegative(),
  domainCount: z.number().int().nonnegative(),
  ownershipGroupCount: z.number().int().nonnegative(),
  originalEvidenceCount: z.number().int().nonnegative(),
  sourceIds: z.array(z.string()),
  lineage: z.array(
    z.object({
      sourceId: z.string(),
      relationship: z.string()
    })
  )
});

export const EvidenceMatchSchema = z.object({
  sourceId: z.string(),
  measuredQuestion: z.string(),
  userQuestionMatch: z.enum(["direct", "partial", "indirect", "mismatch"]),
  mismatchNotes: z.array(z.string())
});

export const ContradictionSchema = z.object({
  claim: z.string(),
  sourceIds: z.array(z.string()),
  quality: z.enum(["strong", "moderate", "limited"]),
  interpretation: z.string()
});

export const MethodologySummarySchema = z.object({
  mode: z.enum(["demo", "live", "partial-live"]),
  providerSummary: z.string(),
  searchedAt: z.string(),
  limitations: z.array(z.string()),
  separationNotice: z.string()
});

export const AnswerAuditSchema = z.object({
  ingredients: z.array(
    z.object({
      label: z.string(),
      count: z.number().int().nonnegative(),
      notes: z.string()
    })
  ),
  claimClusters: z.array(ClaimClusterSchema),
  incentives: z.array(
    z.object({
      sourceId: z.string(),
      sourceType: SourceCategorySchema,
      incentive: IncentiveCategorySchema,
      observations: z.array(z.string()),
      uncertainty: z.string()
    })
  ),
  evidenceMatches: z.array(EvidenceMatchSchema),
  contradictions: z.array(ContradictionSchema),
  missingQuestions: z.array(z.string()),
  protocolStages: z.array(
    z.object({
      name: z.string(),
      status: z.enum(["completed", "partial", "failed"]),
      summary: z.string(),
      createdAt: z.string()
    })
  ),
  safety: z.object({
    hostileInputHandling: z.string(),
    highStakes: z.boolean()
  })
});

export const NotGptAnswerSchema = z.object({
  id: z.string(),
  question: z.string(),
  interpretedQuestion: z.string(),
  category: z.string(),
  directAnswer: z.string(),
  confidentFindings: z.array(AnswerFindingSchema),
  materialUncertainties: z.array(AnswerUncertaintySchema),
  sourceHighlights: z.array(SourceHighlightSchema),
  professionalQuestions: z.array(z.string()).optional(),
  highStakesNotice: z.string().optional(),
  methodologySummary: MethodologySummarySchema,
  audit: AnswerAuditSchema,
  createdAt: z.string(),
  isDemo: z.boolean()
});

export const InvestigationRequestSchema = z.object({
  question: z.string().trim().min(8).max(4000),
  save: z.boolean().optional(),
  publicShare: z.boolean().optional()
});

export const PublicProgressStageSchema = z.object({
  id: z.string(),
  label: z.string(),
  status: z.enum(["pending", "active", "completed", "failed"]),
  summary: z.string().optional()
});

export type SourceCategory = z.infer<typeof SourceCategorySchema>;
export type IncentiveCategory = z.infer<typeof IncentiveCategorySchema>;
export type SourceRecord = z.infer<typeof SourceRecordSchema>;
export type ClaimCluster = z.infer<typeof ClaimClusterSchema>;
export type EvidenceMatch = z.infer<typeof EvidenceMatchSchema>;
export type Contradiction = z.infer<typeof ContradictionSchema>;
export type NotGptAnswer = z.infer<typeof NotGptAnswerSchema>;
export type InvestigationRequest = z.infer<typeof InvestigationRequestSchema>;
export type PublicProgressStage = z.infer<typeof PublicProgressStageSchema>;
