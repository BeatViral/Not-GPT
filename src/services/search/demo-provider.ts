import { demoSources } from "@/data/not-gpt-demo";
import type { RetrievedSearchResult, SearchPlan, SearchProvider } from "./provider";

export class DemoSearchProvider implements SearchProvider {
  metadata = {
    id: "demo-search",
    name: "Deterministic demonstration search",
    mode: "demo" as const
  };

  async search(_plan: SearchPlan): Promise<RetrievedSearchResult[]> {
    return demoSources.map((source, index) => ({
      id: source.id,
      url: source.url,
      title: source.title,
      snippet: source.claims[0] ?? "Illustrative source in the demonstration dataset.",
      provider: this.metadata.id,
      rank: index + 1
    }));
  }
}
