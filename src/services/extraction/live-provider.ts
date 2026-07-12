import { containsPromptInjectionLanguage, normalizeRetrievedText } from "@/lib/security";
import type { RetrievedSearchResult } from "@/services/search";
import type { ExtractionProvider, ExtractedDocument } from "./provider";

export class SafeWebExtractionProvider implements ExtractionProvider {
  metadata = {
    id: "safe-web",
    name: "Safe webpage extraction",
    mode: "live" as const
  };

  async extract(result: RetrievedSearchResult): Promise<ExtractedDocument> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    try {
      const response = await fetch(result.url, {
        redirect: "follow",
        signal: controller.signal,
        headers: {
          Accept: "text/html, text/plain;q=0.8"
        }
      });
      const html = await response.text();
      const normalized = normalizeRetrievedText(html.replace(/<[^>]+>/g, " "));

      return {
        ...result,
        text: normalized.text,
        metadata: {
          title: result.title,
          extractedAt: new Date().toISOString(),
          hostileSignals: containsPromptInjectionLanguage(html)
            ? ["prompt-injection-language-detected"]
            : [],
          truncated: normalized.truncated
        },
        citations: []
      };
    } finally {
      clearTimeout(timeout);
    }
  }
}
