import { DemoSearchProvider } from "./demo-provider";
import { BraveSearchProvider } from "./live-provider";
import type { SearchProvider } from "./provider";

export function createSearchProvider(): SearchProvider {
  if (process.env.SEARCH_PROVIDER === "brave" && process.env.BRAVE_API_KEY) {
    return new BraveSearchProvider(process.env.BRAVE_API_KEY);
  }

  return new DemoSearchProvider();
}

export type { RetrievedSearchResult, SearchPlan, SearchProvider } from "./provider";
