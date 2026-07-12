import type { GooProject } from "@/schemas/goo";

export interface ProjectRepository {
  listPublished(): Promise<GooProject[]>;
  getBySlug(slug: string): Promise<GooProject | null>;
  upsert(project: GooProject): Promise<GooProject>;
  setPublished(projectId: string, published: boolean): Promise<void>;
}
