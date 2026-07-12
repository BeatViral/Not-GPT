import { DemoExtractionProvider } from "./demo-provider";
import { SafeWebExtractionProvider } from "./live-provider";
import type { ExtractionProvider } from "./provider";

export function createExtractionProvider(): ExtractionProvider {
  if (process.env.EXTRACTION_PROVIDER === "live" && process.env.LIVE_SEARCH_ALLOWED === "true") {
    return new SafeWebExtractionProvider();
  }

  return new DemoExtractionProvider();
}

export type { ExtractedDocument, ExtractionProvider } from "./provider";
