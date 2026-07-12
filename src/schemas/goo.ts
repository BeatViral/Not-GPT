import { z } from "zod";

export const GooProjectSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  fullDescription: z.string(),
  category: z.string(),
  stage: z.string(),
  projectUrl: z.string().url().optional(),
  imageUrl: z.string().optional(),
  operator: z.string(),
  tags: z.array(z.string()),
  published: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const OpportunityStatusSchema = z.enum(["open", "paused", "filled", "closed", "archived"]);

export const GooOpportunitySchema = z.object({
  id: z.string(),
  projectId: z.string(),
  schemaVersion: z.string(),
  slug: z.string(),
  title: z.string(),
  shortSummary: z.string(),
  fullDescription: z.string(),
  opportunityType: z.string(),
  roleName: z.string(),
  problemStatement: z.string(),
  status: OpportunityStatusSchema,
  placesTotal: z.number().int().nonnegative(),
  placesRemaining: z.number().int().nonnegative(),
  geography: z.object({
    regions: z.array(z.string()),
    remote: z.boolean(),
    notes: z.string()
  }),
  organisationTypes: z.array(z.string()),
  individualRoles: z.array(z.string()),
  requiredCapabilities: z.array(z.string()),
  preferredCapabilities: z.array(z.string()),
  excludedFits: z.array(z.string()),
  commitment: z.object({
    time: z.string(),
    duration: z.string(),
    decisionWindow: z.string()
  }),
  commercialModel: z.object({
    model: z.string(),
    fees: z.string(),
    sponsorship: z.string()
  }),
  terms: z.object({
    requiresHumanApproval: z.boolean(),
    bindingTermsAllowedByAgent: z.boolean(),
    summary: z.string()
  }),
  risks: z.array(z.string()),
  limitations: z.array(z.string()),
  intellectualProperty: z.object({
    disclosureLevel: z.string(),
    ownership: z.string()
  }),
  agentPermissions: z.object({
    discoverable: z.boolean(),
    maySubmitInterest: z.boolean(),
    requiresHumanConfirmation: z.boolean(),
    mayAcceptTerms: z.literal(false)
  }),
  applicationQuestions: z.array(z.string()),
  whyExists: z.string(),
  afterInterest: z.string(),
  published: z.boolean(),
  opensAt: z.string().nullable(),
  closesAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const InterestInputSchema = z.object({
  opportunityId: z.string(),
  name: z.string().min(2).max(160),
  email: z.string().email(),
  organisation: z.string().max(180).optional(),
  currentRole: z.string().max(180).optional(),
  geography: z.string().max(180),
  capabilities: z.array(z.string()).min(1),
  reasonForInterest: z.string().min(20).max(2000),
  proposedContribution: z.string().min(20).max(2000),
  availability: z.string().min(2).max(400),
  links: z.array(z.string().url()).optional(),
  consentToContact: z.literal(true)
});

export const OpportunityInterestSchema = InterestInputSchema.extend({
  id: z.string(),
  userId: z.string().nullable(),
  status: z.enum(["new", "reviewing", "more-info-requested", "shortlisted", "declined", "accepted"]),
  privateNotes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string()
});

export const PrincipalProfileSchema = z.object({
  organisationType: z.string().optional(),
  currentRole: z.string().optional(),
  geography: z.string().optional(),
  capabilities: z.array(z.string()).default([]),
  availability: z.string().optional(),
  constraints: z.array(z.string()).default([])
});

export const GooMatchResultSchema = z.object({
  opportunityId: z.string(),
  score: z.number().min(0).max(100),
  eligible: z.boolean(),
  hardFilters: z.array(z.string()),
  exclusions: z.array(z.string()),
  matchReasons: z.array(z.string()),
  missingData: z.array(z.string())
});

export type GooProject = z.infer<typeof GooProjectSchema>;
export type GooOpportunity = z.infer<typeof GooOpportunitySchema>;
export type InterestInput = z.infer<typeof InterestInputSchema>;
export type OpportunityInterest = z.infer<typeof OpportunityInterestSchema>;
export type PrincipalProfile = z.infer<typeof PrincipalProfileSchema>;
export type GooMatchResult = z.infer<typeof GooMatchResultSchema>;
