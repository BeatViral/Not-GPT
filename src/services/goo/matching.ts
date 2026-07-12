import { GooMatchResultSchema, PrincipalProfileSchema, type GooOpportunity, type PrincipalProfile } from "@/schemas/goo";
import { listPublishedOpenOpportunities } from "./registry";

function normalise(value: string) {
  return value.trim().toLowerCase();
}

function capabilitySet(profile: PrincipalProfile) {
  return new Set(profile.capabilities.map(normalise));
}

function hasAnyOverlap(left: string[] = [], right: string[] = []) {
  const rightSet = new Set(right.map(normalise));
  return left.some((item) => rightSet.has(normalise(item)));
}

function geographyMatches(profile: PrincipalProfile, opportunity: GooOpportunity) {
  if (opportunity.geography.remote) {
    return true;
  }

  if (!profile.geography) {
    return false;
  }

  return opportunity.geography.regions.map(normalise).includes(normalise(profile.geography));
}

export function matchPrincipalToOpportunity(
  rawProfile: unknown,
  opportunity: GooOpportunity
) {
  const profile = PrincipalProfileSchema.parse(rawProfile);
  const caps = capabilitySet(profile);
  const missingData: string[] = [];
  const hardFilters: string[] = [];
  const exclusions: string[] = [];
  const matchReasons: string[] = [];
  let score = 0;

  if (!profile.organisationType && opportunity.organisationTypes.length > 0) {
    missingData.push("organisationType");
  } else if (
    profile.organisationType &&
    opportunity.organisationTypes.map(normalise).includes(normalise(profile.organisationType))
  ) {
    hardFilters.push("Organisation type is eligible.");
    score += 20;
  } else if (profile.organisationType) {
    exclusions.push("Organisation type does not match this opportunity.");
  }

  if (!profile.geography) {
    missingData.push("geography");
  } else if (geographyMatches(profile, opportunity)) {
    hardFilters.push("Geography is eligible.");
    score += 15;
  } else {
    exclusions.push("Geography does not match this opportunity.");
  }

  const missingRequired = opportunity.requiredCapabilities.filter((required) => !caps.has(normalise(required)));
  if (missingRequired.length === 0) {
    hardFilters.push("Required capabilities are present.");
    score += 35;
  } else {
    exclusions.push(`Missing required capabilities: ${missingRequired.join(", ")}.`);
  }

  const preferredMatches = opportunity.preferredCapabilities.filter((preferred) => caps.has(normalise(preferred)));
  if (preferredMatches.length > 0) {
    matchReasons.push(`Preferred capabilities matched: ${preferredMatches.join(", ")}.`);
    score += Math.min(20, preferredMatches.length * 8);
  }

  if (profile.currentRole && hasAnyOverlap([profile.currentRole], opportunity.individualRoles)) {
    matchReasons.push("Current role is directly relevant.");
    score += 10;
  }

  const exclusionHit = opportunity.excludedFits.find((excluded) =>
    profile.constraints.map(normalise).some((constraint) => constraint.includes(normalise(excluded)))
  );

  if (exclusionHit) {
    exclusions.push(`Profile appears to match excluded fit: ${exclusionHit}.`);
    score = 0;
  }

  const eligible = exclusions.length === 0 && missingRequired.length === 0 && opportunity.status === "open";

  return GooMatchResultSchema.parse({
    opportunityId: opportunity.id,
    score: eligible ? Math.min(100, score) : 0,
    eligible,
    hardFilters,
    exclusions,
    matchReasons,
    missingData
  });
}

export function matchPrincipal(rawProfile: unknown, opportunities = listPublishedOpenOpportunities()) {
  const profile = PrincipalProfileSchema.parse(rawProfile);
  return opportunities
    .map((opportunity) => matchPrincipalToOpportunity(profile, opportunity))
    .filter((result) => result.eligible)
    .sort((a, b) => b.score - a.score);
}
