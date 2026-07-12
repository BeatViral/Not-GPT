export type EmbeddingUseCase = "project" | "opportunity" | "principal";

export interface EmbeddingProvider {
  metadata: {
    id: string;
    name: string;
    mode: "demo" | "live" | "mock";
  };
  embed(input: string, useCase: EmbeddingUseCase): Promise<number[]>;
  similarity(left: number[], right: number[]): number;
}
