"use client";

import { useMemo, useState } from "react";
import type { GooOpportunity, GooProject } from "@/schemas/goo";
import { ProjectCard } from "./ProjectCard";
import { OpportunityCard } from "./OpportunityCard";
import { OpportunityFilters } from "./OpportunityFilters";

export function GooDirectory({
  projects,
  opportunities
}: {
  projects: GooProject[];
  opportunities: GooOpportunity[];
}) {
  const [query, setQuery] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return opportunities.filter((opportunity) => {
      const haystack = [
        opportunity.title,
        opportunity.shortSummary,
        opportunity.roleName,
        opportunity.requiredCapabilities.join(" "),
        projects.find((project) => project.id === opportunity.projectId)?.name ?? ""
      ]
        .join(" ")
        .toLowerCase();

      return (!needle || haystack.includes(needle)) && (!remoteOnly || opportunity.geography.remote);
    });
  }, [opportunities, projects, query, remoteOnly]);

  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">Open roles</p>
            <h2 className="mt-2 text-2xl font-semibold text-ink">Published opportunities</h2>
          </div>
        </div>
        <div className="mt-4">
          <OpportunityFilters
            query={query}
            onQueryChange={setQuery}
            remoteOnly={remoteOnly}
            onRemoteOnlyChange={setRemoteOnly}
          />
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {filtered.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              project={projects.find((project) => project.id === opportunity.projectId)}
            />
          ))}
        </div>
      </section>
      <section>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">Invention registry</p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">Founder Lab projects</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
