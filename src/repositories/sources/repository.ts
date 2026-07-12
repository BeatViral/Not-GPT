import type { SourceRecord } from "@/schemas/not-gpt";

export interface SourceRepository {
  saveMany(investigationId: string, sources: SourceRecord[]): Promise<void>;
  listForInvestigation(investigationId: string): Promise<SourceRecord[]>;
}
