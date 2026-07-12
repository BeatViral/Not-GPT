import { describe, expect, it } from "vitest";
import { gooOpportunities } from "@/services/goo/demo-data";
import { matchPrincipal, matchPrincipalToOpportunity } from "@/services/goo/matching";

describe("GOO matching", () => {
  it("excludes closed and unpublished opportunities", () => {
    const open = gooOpportunities[0];
    const closed = { ...open, id: "closed", slug: "closed", status: "closed" as const };
    const unpublished = { ...open, id: "unpublished", slug: "unpublished", published: false };
    const results = matchPrincipal(
      {
        organisationType: "research institute",
        currentRole: "research lead",
        geography: "Australia",
        capabilities: ["evidence synthesis", "study design", "public communication"],
        constraints: []
      },
      [open, closed, unpublished].filter(
        (opportunity) =>
          opportunity.published && opportunity.status === "open" && opportunity.placesRemaining > 0
      )
    );

    expect(results).toHaveLength(1);
    expect(results[0].opportunityId).toBe(open.id);
  });

  it("applies required capabilities and geography rules", () => {
    const opportunity = gooOpportunities.find((item) => item.slug === "reverse-car-market-dealership-pilot")!;
    const result = matchPrincipalToOpportunity(
      {
        organisationType: "dealership",
        currentRole: "dealer principal",
        geography: "Australia",
        capabilities: ["automotive retail", "pilot operations", "customer response process"],
        constraints: []
      },
      opportunity
    );

    expect(result.eligible).toBe(true);
    expect(result.hardFilters).toContain("Required capabilities are present.");
  });

  it("reports incomplete information honestly", () => {
    const result = matchPrincipalToOpportunity(
      {
        capabilities: ["evidence synthesis", "study design", "public communication"],
        constraints: []
      },
      gooOpportunities[0]
    );

    expect(result.missingData).toContain("organisationType");
    expect(result.missingData).toContain("geography");
  });

  it("honors exclusions", () => {
    const result = matchPrincipalToOpportunity(
      {
        organisationType: "research institute",
        currentRole: "research lead",
        geography: "Australia",
        capabilities: ["evidence synthesis", "study design", "public communication"],
        constraints: ["paid ranking network"]
      },
      gooOpportunities[0]
    );

    expect(result.eligible).toBe(false);
    expect(result.exclusions.join(" ")).toContain("excluded fit");
  });

  it("does not allow agents to accept binding terms automatically", () => {
    expect(gooOpportunities.every((opportunity) => opportunity.agentPermissions.mayAcceptTerms === false)).toBe(true);
    expect(gooOpportunities.every((opportunity) => opportunity.terms.bindingTermsAllowedByAgent === false)).toBe(true);
  });
});
