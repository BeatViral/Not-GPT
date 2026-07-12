import type { EmbeddingProvider, EmbeddingUseCase } from "./provider";

export class DemoEmbeddingProvider implements EmbeddingProvider {
  metadata = {
    id: "demo-embeddings",
    name: "Deterministic demo embeddings",
    mode: "demo" as const
  };

  async embed(input: string, _useCase: EmbeddingUseCase): Promise<number[]> {
    const buckets = Array.from({ length: 16 }, () => 0);
    for (let index = 0; index < input.length; index += 1) {
      buckets[index % buckets.length] += input.charCodeAt(index) / 255;
    }
    const norm = Math.sqrt(buckets.reduce((sum, value) => sum + value * value, 0)) || 1;
    return buckets.map((value) => value / norm);
  }

  similarity(left: number[], right: number[]) {
    const length = Math.min(left.length, right.length);
    let score = 0;
    for (let index = 0; index < length; index += 1) {
      score += left[index] * right[index];
    }
    return score;
  }
}
