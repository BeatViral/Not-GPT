import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { getOpportunityBySlug } from "@/services/goo/registry";
import { submitOpportunityInterest } from "@/services/goo/interests";

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  const opportunity = getOpportunityBySlug(params.slug);
  if (!opportunity) {
    return NextResponse.json({ error: "This opportunity is not available." }, { status: 404 });
  }

  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const rateLimit = checkRateLimit(`goo-interest:${ip}`, Number(process.env.RATE_LIMIT_INTERESTS ?? 10));

  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Interest submission rate limit reached. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const interest = submitOpportunityInterest({
      ...body,
      opportunityId: opportunity.id
    });

    return NextResponse.json({
      interest,
      status:
        "Interest recorded for human review. No binding terms are accepted and no role is awarded automatically."
    });
  } catch {
    return NextResponse.json(
      { error: "Interest could not be submitted. Please check the required fields." },
      { status: 400 }
    );
  }
}
