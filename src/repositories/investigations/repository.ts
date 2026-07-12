import type { NotGptAnswer } from "@/schemas/not-gpt";

export interface InvestigationRepository {
  saveAnswer(answer: NotGptAnswer, userId?: string): Promise<{ id: string; shareSlug?: string }>;
  getPublicAnswer(shareSlug: string): Promise<NotGptAnswer | null>;
  listForUser(userId: string): Promise<NotGptAnswer[]>;
}
