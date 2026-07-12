import { DemoEmbeddingProvider } from "./demo-provider";
import type { EmbeddingProvider } from "./provider";

export function createEmbeddingProvider(): EmbeddingProvider {
  return new DemoEmbeddingProvider();
}

export type { EmbeddingProvider, EmbeddingUseCase } from "./provider";
