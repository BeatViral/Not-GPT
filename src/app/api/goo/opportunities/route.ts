import { NextResponse } from "next/server";
import { listPublishedOpenOpportunities } from "@/services/goo/registry";

export async function GET() {
  return NextResponse.json({
    schemaVersion: "1.0.0",
    trustPrinciples: [
      "No paid ranking",
      "No hidden sponsorship",
      "Human approval required for binding terms",
      "Genuine fit is more important than spending"
    ],
    opportunities: listPublishedOpenOpportunities()
  });
}
