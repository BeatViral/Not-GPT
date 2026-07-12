export type SearchPlan = {
  tracks: Array<{
    name: string;
    queries: string[];
    rationale: string;
  }>;
};

export type RetrievedSearchResult = {
  id: string;
  url: string;
  title: string;
  snippet: string;
  provider: string;
  rank: number;
};

export type SearchProviderMetadata = {
  id: string;
  name: string;
  mode: "demo" | "live" | "mock";
};

export interface SearchProvider {
  metadata: SearchProviderMetadata;
  search(plan: SearchPlan): Promise<RetrievedSearchResult[]>;
}
