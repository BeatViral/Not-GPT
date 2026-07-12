import type {
  ClaimCluster,
  Contradiction,
  EvidenceMatch,
  NotGptAnswer,
  SourceRecord
} from "@/schemas/not-gpt";
import type { ExtractedDocument } from "@/services/extraction";
import type { SearchPlan } from "@/services/search";

export type QuestionInterpretation = {
  literalQuestion: string;
  underlyingDecision: string;
  topic: string;
  entities: string[];
  population?: string;
  interventionOrClaim?: string;
  comparison?: string;
  outcome?: string;
  timeframe?: string;
  geography?: string;
  riskBeingEvaluated?: string;
  benefitBeingEvaluated?: string;
  ambiguousTerminology: string[];
  highStakes: boolean;
};

export type UncertaintyFinding = {
  id: string;
  text: string;
  whyItMatters: string;
  sourceIds: string[];
};

export type SynthesisInput = {
  question: string;
  interpretation: QuestionInterpretation;
  sources: SourceRecord[];
  clusters: ClaimCluster[];
  matches: EvidenceMatch[];
  contradictions: Contradiction[];
  uncertainties: UncertaintyFinding[];
  protocolStages: NotGptAnswer["audit"]["protocolStages"];
};

export interface AnalysisProvider {
  metadata: {
    id: string;
    name: string;
    mode: "demo" | "live" | "mock";
  };
  interpretQuestion(question: string): Promise<QuestionInterpretation>;
  generateSearchPlan(interpretation: QuestionInterpretation): Promise<SearchPlan>;
  classifySources(documents: ExtractedDocument[]): Promise<SourceRecord[]>;
  extractClaimClusters(sources: SourceRecord[]): Promise<ClaimCluster[]>;
  compareEvidenceToQuestion(
    sources: SourceRecord[],
    interpretation: QuestionInterpretation
  ): Promise<EvidenceMatch[]>;
  analyzeContradictions(
    sources: SourceRecord[],
    clusters: ClaimCluster[]
  ): Promise<Contradiction[]>;
  constructUncertainty(
    sources: SourceRecord[],
    matches: EvidenceMatch[],
    contradictions: Contradiction[]
  ): Promise<UncertaintyFinding[]>;
  synthesizeFinal(input: SynthesisInput): Promise<NotGptAnswer>;
}
