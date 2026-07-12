import {
  demoClaimClusters,
  demoContradictions,
  demoEvidenceMatches,
  demoSources
} from "@/data/not-gpt-demo";
import { createDemoNotGptAnswer } from "@/services/not-gpt/demo-answer";
import { clusterEquivalentClaims, compareSourceToQuestion } from "@/services/not-gpt/protocol-utils";
import type { SourceRecord } from "@/schemas/not-gpt";
import type { ExtractedDocument } from "@/services/extraction";
import type {
  AnalysisProvider,
  QuestionInterpretation,
  SynthesisInput,
  UncertaintyFinding
} from "./provider";

export class DemoAnalysisProvider implements AnalysisProvider {
  metadata: AnalysisProvider["metadata"] = {
    id: "demo-analysis",
    name: "Deterministic demonstration analysis",
    mode: "demo"
  };

  async interpretQuestion(question: string): Promise<QuestionInterpretation> {
    const lower = question.toLowerCase();
    const highStakes =
      lower.includes("child") ||
      lower.includes("medical") ||
      lower.includes("treatment") ||
      lower.includes("health") ||
      lower.includes("braces");

    return {
      literalQuestion: question,
      underlyingDecision:
        "Whether to proceed with orthodontic treatment and what risks or evidence gaps should be discussed first.",
      topic: "Orthodontics and facial development",
      entities: ["braces", "child", "facial development"],
      population: lower.includes("12") ? "12-year-old child" : "child or adolescent",
      interventionOrClaim: "braces or orthodontic intervention during growth",
      comparison: "no treatment, delayed treatment or different treatment subtype",
      outcome: "long-term facial development, tooth alignment and bite relationship",
      timeframe: "during growth and after growth completion",
      riskBeingEvaluated: "adverse change to long-term facial development",
      benefitBeingEvaluated: "improved alignment, bite and possibly jaw relationship",
      ambiguousTerminology: ["facial development", "braces", "affect"],
      highStakes
    };
  }

  async generateSearchPlan(interpretation: QuestionInterpretation) {
    const base = interpretation.topic;
    return {
      tracks: [
        {
          name: "Dominant internet position",
          queries: [`${base} braces facial development common claims`],
          rationale: "Collect repeated visible claims before collapsing them into evidence origins."
        },
        {
          name: "Primary research",
          queries: [`${base} orthodontics growth primary study long term`],
          rationale: "Find original evidence rather than only summaries."
        },
        {
          name: "Systematic reviews and meta-analyses",
          queries: [`${base} systematic review orthodontic treatment facial growth`],
          rationale: "Identify evidence syntheses and their limitations."
        },
        {
          name: "Professional guidance",
          queries: [`${base} professional guideline orthodontic timing children`],
          rationale: "Understand ordinary clinical framing without treating guidance as proof."
        },
        {
          name: "Harms and contradictions",
          queries: [`${base} orthodontic treatment harms facial change criticism`],
          rationale: "Actively seek credible contradictory or negative evidence."
        },
        {
          name: "Funding and incentives",
          queries: [`${base} orthodontic industry funding conflicts`],
          rationale: "Separate evidence quality from visible source incentives."
        }
      ]
    };
  }

  async classifySources(documents: ExtractedDocument[]): Promise<SourceRecord[]> {
    const ids = new Set(documents.map((document) => document.id));
    const matched = demoSources.filter((source) => ids.has(source.id));
    return matched.length > 0 ? matched : demoSources;
  }

  async extractClaimClusters(sources: SourceRecord[]) {
    if (sources.length === demoSources.length && sources.every((source) => source.url.includes("example.org"))) {
      return demoClaimClusters;
    }

    return clusterEquivalentClaims(sources);
  }

  async compareEvidenceToQuestion(sources: SourceRecord[], interpretation: QuestionInterpretation) {
    if (sources.length === demoSources.length && interpretation.topic === "Orthodontics and facial development") {
      return demoEvidenceMatches;
    }

    return sources.map((source) => compareSourceToQuestion(source, interpretation.literalQuestion));
  }

  async analyzeContradictions() {
    return demoContradictions;
  }

  async constructUncertainty(): Promise<UncertaintyFinding[]> {
    return [
      {
        id: "uncertainty-treatment-subtype",
        text: "The exact treatment plan matters and is not known from the question alone.",
        whyItMatters: "Different appliances and extraction decisions can change the evidence match.",
        sourceIds: ["src-systematic-review", "src-professional-guideline"]
      },
      {
        id: "uncertainty-direct-outcomes",
        text: "Long-term facial-development outcomes are less directly measured than dental outcomes.",
        whyItMatters: "A source can be strong for tooth alignment while still indirect for the parent's concern.",
        sourceIds: ["src-growth-registry", "src-methods-critique"]
      }
    ];
  }

  async synthesizeFinal(input: SynthesisInput) {
    return createDemoNotGptAnswer(input.question, input.protocolStages);
  }
}
