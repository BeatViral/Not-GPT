import { NextResponse } from "next/server";
import { listPublishedProjects } from "@/services/goo/registry";

export async function GET() {
  return NextResponse.json({
    schemaVersion: "1.0.0",
    projects: listPublishedProjects()
  });
}
