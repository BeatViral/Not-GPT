import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { GooProject } from "@/schemas/goo";
import { StatusBadge } from "@/components/shared/StatusBadge";

export function ProjectCard({ project }: { project: GooProject }) {
  return (
    <article className="rounded-lg border border-line bg-white p-5 shadow-soft-line">
      <div className="flex flex-wrap gap-2">
        <StatusBadge tone="info">{project.category}</StatusBadge>
        <StatusBadge>{project.stage}</StatusBadge>
      </div>
      <h2 className="mt-4 text-xl font-semibold text-ink">{project.name}</h2>
      <p className="mt-2 text-sm leading-6 text-ink/68">{project.shortDescription}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-lg bg-paper px-2.5 py-1 text-xs font-semibold text-ink/55">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/goo/projects/${project.slug}`}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:bg-ink/5"
      >
        Inspect project
        <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </article>
  );
}
