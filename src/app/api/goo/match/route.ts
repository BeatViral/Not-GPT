import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { matchPrincipal } from "@/services/goo/matching";
import { listPublishedOpenOpportunities } from "@/services/goo/registry";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const rateLimit = checkRateLimit(`goo-match:${ip}`, Number(process.env.RATE_LIMIT_GOO_MATCHES ?? 40));

  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "GOO matching rate limit reached. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const candidates = listPublishedOpenOpportunities();
    const matches = matchPrincipal(body.principal ?? body, candidates);

    return NextResponse.json({
      schemaVersion: "1.0.0",
      candidateCount: candidates.length,
      matches,
      explanation:
        "Matches apply hard filters first, then explain required capability, geography, role and preferred-capability fit."
    });
  } catch {
    return NextResponse.json(
      { error: "Matching could not be completed. Please provide a valid principal profile." },
      { status: 400 }
    );
  }
}
