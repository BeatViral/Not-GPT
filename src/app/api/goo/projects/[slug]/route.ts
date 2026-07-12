import { NextResponse } from "next/server";
import { getOpportunitiesForProject, getProjectBySlug } from "@/services/goo/registry";

export async function GET(_request: Request, { params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  return NextResponse.json({
    schemaVersion: "1.0.0",
    project,
    opportunities: getOpportunitiesForProject(project.id)
  });
}
