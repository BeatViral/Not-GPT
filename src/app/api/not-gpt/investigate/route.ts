import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { runNotGptInvestigation } from "@/services/not-gpt/pipeline";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const rateLimit = checkRateLimit(`not-gpt:${ip}`, Number(process.env.RATE_LIMIT_SEARCHES ?? 20));

  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Search rate limit reached. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const answer = await runNotGptInvestigation(body);
    return NextResponse.json({ answer });
  } catch {
    return NextResponse.json(
      { error: "The investigation could not be completed. Please revise the question and try again." },
      { status: 400 }
    );
  }
}
