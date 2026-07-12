import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "GOO Opportunity Protocol",
    description:
      "Generative Opportunity Optimization exposes structured, human-approved opportunity objects around inventions.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/goo`,
    capabilities: [
      {
        id: "discover_opportunities",
        description: "Inspect published open opportunities as structured JSON."
      },
      {
        id: "match_principal",
        description: "Compare a principal profile against open opportunities with explainable fit reasons."
      },
      {
        id: "submit_confirmed_interest",
        description:
          "Submit an expression of interest after human confirmation. Binding terms cannot be accepted by an agent."
      }
    ],
    constraints: [
      "No paid opportunity ranking",
      "No hidden sponsorship",
      "No agent acceptance of binding terms",
      "Human approval is required for role award and commercial terms"
    ],
    endpoints: {
      opportunities: "/api/goo/opportunities",
      match: "/api/goo/match",
      mcpResources: "/api/goo/mcp/resources",
      mcpTools: "/api/goo/mcp/tools"
    }
  });
}
