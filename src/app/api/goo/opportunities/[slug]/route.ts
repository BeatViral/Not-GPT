import { NextResponse } from "next/server";
import { getOpportunityBySlug, getProjectById } from "@/services/goo/registry";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const opportunity = getOpportunityBySlug(params.slug);

  if (!opportunity) {
    return NextResponse.json({ error: "Opportunity not found or not open." }, { status: 404 });
  }

  return NextResponse.json({
    schemaVersion: "1.0.0",
    opportunity,
    project: getProjectById(opportunity.projectId)
  });
}
