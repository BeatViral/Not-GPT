import type { RetrievedSearchResult } from "@/services/search";

export type ExtractedDocument = RetrievedSearchResult & {
  text: string;
  metadata: {
    title: string;
    publisher?: string;
    publishedAt?: string;
    extractedAt: string;
    hostileSignals: string[];
    truncated: boolean;
  };
  citations: string[];
};

export interface ExtractionProvider {
  metadata: {
    id: string;
    name: string;
    mode: "demo" | "live" | "mock";
  };
  extract(result: RetrievedSearchResult): Promise<ExtractedDocument>;
}
