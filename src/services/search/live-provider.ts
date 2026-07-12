import type { RetrievedSearchResult, SearchPlan, SearchProvider } from "./provider";

export class BraveSearchProvider implements SearchProvider {
  metadata = {
    id: "brave",
    name: "Brave Search",
    mode: "live" as const
  };

  constructor(private readonly apiKey: string) {}

  async search(plan: SearchPlan): Promise<RetrievedSearchResult[]> {
    const queries = plan.tracks.flatMap((track) => track.queries).slice(0, 8);
    const results: RetrievedSearchResult[] = [];

    for (const query of queries) {
      const response = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`,
        {
          headers: {
            Accept: "application/json",
            "X-Subscription-Token": this.apiKey
          },
          next: { revalidate: 60 * 30 }
        }
      );

      if (!response.ok) {
        continue;
      }

      const json = (await response.json()) as {
        web?: { results?: Array<{ url: string; title: string; description?: string }> };
      };

      for (const item of json.web?.results ?? []) {
        if (!results.some((existing) => existing.url === item.url)) {
          results.push({
            id: `live-${results.length + 1}`,
            url: item.url,
            title: item.title,
            snippet: item.description ?? "",
            provider: this.metadata.id,
            rank: results.length + 1
          });
        }
      }
    }

    return results;
  }
}
