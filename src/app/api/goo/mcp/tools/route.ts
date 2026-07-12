import { NextResponse } from "next/server";
import { getOpportunityBySlug } from "@/services/goo/registry";
import { submitOpportunityInterest } from "@/services/goo/interests";

export async function GET() {
  return NextResponse.json({
    tools: [
      {
        name: "goo.search_opportunities",
        description: "Search published open GOO opportunities.",
        destructive: false
      },
      {
        name: "goo.submit_confirmed_interest",
        description:
          "Submit an expression of interest only after human confirmation. Cannot accept binding terms.",
        destructive: false,
        requiresHumanConfirmation: true
      }
    ]
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      toolName?: string;
      confirmedByHuman?: boolean;
      opportunitySlug?: string;
      arguments?: Record<string, unknown>;
    };

    if (body.toolName !== "goo.submit_confirmed_interest") {
      return NextResponse.json({ error: "Unsupported tool." }, { status: 400 });
    }

    if (!body.confirmedByHuman) {
      return NextResponse.json(
        { error: "Human confirmation is required before submitting interest." },
        { status: 409 }
      );
    }

    const opportunity = body.opportunitySlug ? getOpportunityBySlug(body.opportunitySlug) : null;
    if (!opportunity) {
      return NextResponse.json({ error: "Opportunity not found." }, { status: 404 });
    }

    const interest = submitOpportunityInterest({
      ...body.arguments,
      opportunityId: opportunity.id,
      consentToContact: true
    });

    return NextResponse.json({
      result: interest,
      bindingTermsAccepted: false,
      message: "Confirmed interest submitted for human review only."
    });
  } catch {
    return NextResponse.json({ error: "Tool call failed validation." }, { status: 400 });
  }
}
