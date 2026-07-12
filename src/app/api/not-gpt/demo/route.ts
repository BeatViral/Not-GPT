import { NextResponse } from "next/server";
import { demoQuestion } from "@/data/not-gpt-demo";
import { runNotGptInvestigation } from "@/services/not-gpt/pipeline";

export async function GET() {
  const answer = await runNotGptInvestigation({ question: demoQuestion });
  return NextResponse.json({ answer });
}
