import { gooOpportunities, gooProjects } from "./demo-data";

export function listPublishedProjects() {
  return gooProjects.filter((project) => project.published);
}

export function listPublishedOpenOpportunities() {
  return gooOpportunities.filter(
    (opportunity) =>
      opportunity.published &&
      opportunity.status === "open" &&
      opportunity.placesRemaining > 0
  );
}

export function getProjectBySlug(slug: string) {
  return listPublishedProjects().find((project) => project.slug === slug) ?? null;
}

export function getProjectById(id: string) {
  return listPublishedProjects().find((project) => project.id === id) ?? null;
}

export function getOpportunityBySlug(slug: string) {
  return listPublishedOpenOpportunities().find((opportunity) => opportunity.slug === slug) ?? null;
}

export function getOpportunitiesForProject(projectId: string) {
  return listPublishedOpenOpportunities().filter((opportunity) => opportunity.projectId === projectId);
}
