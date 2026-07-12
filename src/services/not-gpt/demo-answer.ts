import { randomUUID } from "crypto";
import { brand } from "@/config/brand";
import {
  demoClaimClusters,
  demoContradictions,
  demoEvidenceMatches,
  demoSources
} from "@/data/not-gpt-demo";
import type { NotGptAnswer } from "@/schemas/not-gpt";

type ProtocolStage = NotGptAnswer["audit"]["protocolStages"][number];

export function createDemoNotGptAnswer(question: string, protocolStages: ProtocolStage[]): NotGptAnswer {
  const createdAt = new Date().toISOString();

  return {
    id: `ans-${randomUUID()}`,
    question,
    interpretedQuestion:
      "Could orthodontic treatment during a 12-year-old child's growth period materially affect long-term facial development, and what does the evidence directly measure?",
    category: "Health and treatment evidence",
    directAnswer:
      "In this demonstration answer, the evidence supports a cautious answer: braces at age 12 can affect tooth position and bite relationships, and some treatments may influence jaw relationships, but this demo evidence does not support a confident claim that routine braces reliably harm long-term facial development. The biggest issue is that many sources measure dental or skeletal proxy outcomes, not the broader facial-development concern a parent usually means.",
    confidentFindings: [
      {
        id: "finding-dental-outcomes",
        text: "The strongest support is for changes in tooth alignment and bite relationships, not for a sweeping claim about overall facial development.",
        supportLevel: "moderate",
        sourceIds: ["src-growth-registry", "src-systematic-review", "src-professional-guideline"]
      },
      {
        id: "finding-commercial-amplification",
        text: "Some commercial pages broaden narrower timing guidance into stronger claims about guiding facial growth.",
        supportLevel: "limited",
        sourceIds: ["src-commercial-clinic", "src-professional-guideline"]
      },
      {
        id: "finding-testimony",
        text: "Personal reports of facial change are worth noticing as a concern, but they do not establish that braces caused the change.",
        supportLevel: "limited",
        sourceIds: ["src-parent-forum", "src-methods-critique"]
      }
    ],
    materialUncertainties: [
      {
        id: "uncertainty-treatment-type",
        text: "Treatment details matter: extraction versus non-extraction care, expanders, appliances, growth pattern and clinician plan may change relevance.",
        whyItMatters:
          "A broad answer about braces may hide the treatment-specific question a parent actually needs answered.",
        sourceIds: ["src-systematic-review", "src-methods-critique"]
      },
      {
        id: "uncertainty-long-term-outcomes",
        text: "The demo source set does not directly measure long-term facial appearance after growth completion for every treatment subtype.",
        whyItMatters:
          "Absence of reported harm is weaker than direct evidence that the harm was carefully measured.",
        sourceIds: ["src-growth-registry", "src-methods-critique"]
      },
      {
        id: "uncertainty-individual-diagnosis",
        text: "An individual child's diagnosis, growth stage and treatment plan cannot be inferred from general sources.",
        whyItMatters:
          "The useful next step is a specific treatment-plan question, not a generic yes-or-no about braces.",
        sourceIds: ["src-professional-guideline"]
      }
    ],
    sourceHighlights: demoSources.slice(0, 5).map((source) => ({
      sourceId: source.id,
      title: source.title,
      publisher: source.publisher,
      date: source.publicationDate,
      url: source.url,
      sourceCategory: source.sourceCategory,
      incentiveCategory: source.incentiveCategory,
      whyUsed:
        source.id === "src-commercial-clinic"
          ? "Included to show how a commercial source can amplify a narrower evidence claim."
          : source.primarySource
            ? "Included as an illustrative original evidence source."
            : "Included because it helps interpret claim strength, incentives or applicability."
    })),
    professionalQuestions: [
      "What exact treatment is being proposed, and does it include extraction, expansion or growth-modifying appliances?",
      "Which facial or skeletal outcomes does the orthodontist expect to change, and what evidence supports that expectation?",
      "How will the plan distinguish normal growth from treatment effects over time?"
    ],
    highStakesNotice:
      "This is not medical advice. For a child-specific decision, ask a qualified orthodontist or dentist to explain the diagnosis, treatment alternatives, risks and follow-up plan.",
    methodologySummary: {
      mode: "demo",
      providerSummary:
        "Deterministic demonstration providers were used because live search or analysis keys are not configured.",
      searchedAt: createdAt,
      limitations: [
        brand.demoNotice,
        "The source names and URLs are fictional demonstration material.",
        "The answer demonstrates the evidence protocol and should not be used as a live medical investigation."
      ],
      separationNotice:
        "GOO is not part of the NOT GPT answer pipeline. It is an independent opportunity-discovery framework deployed within the same platform."
    },
    audit: {
      ingredients: [
        {
          label: "Primary or original evidence",
          count: demoSources.filter((source) => source.primarySource).length,
          notes: "Original evidence is separated from repeated summaries and commercial explainers."
        },
        {
          label: "Systematic review or synthesis",
          count: demoSources.filter((source) => source.sourceCategory === "Systematic review").length,
          notes: "Synthesis helps understand the state of evidence but still inherits limits of included studies."
        },
        {
          label: "Professional guidance",
          count: demoSources.filter((source) => source.sourceCategory === "Professional guideline").length,
          notes: "Guidance is useful for practice context and is checked for professional alignment."
        },
        {
          label: "Commercial or testimonial sources",
          count: demoSources.filter(
            (source) =>
              source.sourceCategory === "Commercial service provider" ||
              source.sourceCategory === "Forum or social discussion"
          ).length,
          notes: "These are not discarded automatically, but they do not count as independent proof."
        }
      ],
      claimClusters: demoClaimClusters,
      incentives: demoSources.map((source) => ({
        sourceId: source.id,
        sourceType: source.sourceCategory,
        incentive: source.incentiveCategory,
        observations: source.classificationReasoning.observations,
        uncertainty: source.classificationReasoning.uncertainty
      })),
      evidenceMatches: demoEvidenceMatches,
      contradictions: demoContradictions,
      missingQuestions: [
        "Which treatment subtype is being recommended for this child?",
        "Are facial-growth outcomes directly measured or inferred from bite and tooth-position outcomes?",
        "How long will the child be followed after active growth?",
        "What credible evidence would change the treatment recommendation?"
      ],
      protocolStages,
      safety: {
        hostileInputHandling:
          "Retrieved text is treated as untrusted source content and never as instructions for the answer generator.",
        highStakes: true
      }
    },
    createdAt,
    isDemo: true
  };
}
