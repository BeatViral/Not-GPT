import { randomUUID } from "crypto";
import { InterestInputSchema, type OpportunityInterest } from "@/schemas/goo";

const interests: OpportunityInterest[] = [];

export function submitOpportunityInterest(input: unknown): OpportunityInterest {
  const parsed = InterestInputSchema.parse(input);
  const now = new Date().toISOString();
  const interest: OpportunityInterest = {
    ...parsed,
    id: `interest-${randomUUID()}`,
    userId: null,
    links: parsed.links ?? [],
    status: "new",
    privateNotes: "",
    createdAt: now,
    updatedAt: now
  };
  interests.push(interest);
  return interest;
}

export function listDemoInterests() {
  return interests;
}
