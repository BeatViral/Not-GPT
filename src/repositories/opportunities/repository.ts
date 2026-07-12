import type { GooOpportunity, OpportunityInterest } from "@/schemas/goo";

export interface OpportunityRepository {
  listPublishedOpen(): Promise<GooOpportunity[]>;
  getBySlug(slug: string): Promise<GooOpportunity | null>;
  upsert(opportunity: GooOpportunity): Promise<GooOpportunity>;
  setStatus(opportunityId: string, status: GooOpportunity["status"]): Promise<void>;
  submitInterest(interest: OpportunityInterest): Promise<OpportunityInterest>;
}
