import { NextResponse } from "next/server";
import { listPublishedOpenOpportunities, listPublishedProjects } from "@/services/goo/registry";

export async function GET() {
  const opportunities = listPublishedOpenOpportunities();

  return NextResponse.json({
    mcpVersion: "2024-11-05",
    resources: [
      {
        uri: "goo://projects",
        name: "Published GOO projects",
        mimeType: "application/json",
        data: listPublishedProjects()
      },
      {
        uri: "goo://opportunities",
        name: "Published open GOO opportunities",
        mimeType: "application/json",
        data: opportunities
      },
      ...opportunities.map((opportunity) => ({
        uri: `goo://opportunities/${opportunity.slug}`,
        name: opportunity.title,
        mimeType: "application/json",
        data: opportunity
      }))
    ]
  });
}
