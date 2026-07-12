import { demoSources } from "@/data/not-gpt-demo";
import { containsPromptInjectionLanguage, normalizeRetrievedText } from "@/lib/security";
import type { ExtractionProvider, ExtractedDocument } from "./provider";
import type { RetrievedSearchResult } from "@/services/search";

export class DemoExtractionProvider implements ExtractionProvider {
  metadata = {
    id: "demo-extraction",
    name: "Deterministic demonstration extraction",
    mode: "demo" as const
  };

  async extract(result: RetrievedSearchResult): Promise<ExtractedDocument> {
    const source = demoSources.find((candidate) => candidate.id === result.id);
    const joined = source
      ? `${source.title}. ${source.claims.join(" ")} ${source.studyMetadata.limitations.join(" ")}`
      : result.snippet;
    const normalized = normalizeRetrievedText(joined);

    return {
      ...result,
      text: normalized.text,
      metadata: {
        title: source?.title ?? result.title,
        publisher: source?.publisher,
        publishedAt: source?.publicationDate ?? undefined,
        extractedAt: new Date().toISOString(),
        hostileSignals: containsPromptInjectionLanguage(joined)
          ? ["prompt-injection-language-detected"]
          : [],
        truncated: normalized.truncated
      },
      citations: source?.citations ?? []
    };
  }
}
