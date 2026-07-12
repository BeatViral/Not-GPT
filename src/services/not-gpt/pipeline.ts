import { InvestigationRequestSchema, type NotGptAnswer, type PublicProgressStage } from "@/schemas/not-gpt";
import { createAnalysisProvider } from "@/services/analysis";
import { createExtractionProvider } from "@/services/extraction";
import { createSearchProvider } from "@/services/search";
import { markStage, publicProgressStages } from "./progress";

type ProtocolStage = NotGptAnswer["audit"]["protocolStages"][number];

export type InvestigationProgressHandler = (stage: PublicProgressStage) => Promise<void> | void;

function completedProtocolStage(name: string, summary: string): ProtocolStage {
  return {
    name,
    status: "completed",
    summary,
    createdAt: new Date().toISOString()
  };
}

export async function runNotGptInvestigation(
  input: unknown,
  options: { onProgress?: InvestigationProgressHandler } = {}
) {
  const request = InvestigationRequestSchema.parse(input);
  const searchProvider = createSearchProvider();
  const extractionProvider = createExtractionProvider();
  const analysisProvider = createAnalysisProvider();
  let publicStages = publicProgressStages;
  const protocolStages: ProtocolStage[] = [];

  async function emit(stageId: string, summary: string) {
    publicStages = markStage(publicStages, stageId, "completed", summary);
    const stage = publicStages.find((candidate) => candidate.id === stageId);
    if (stage) {
      await options.onProgress?.(stage);
    }
  }

  const interpretation = await analysisProvider.interpretQuestion(request.question);
  protocolStages.push(
    completedProtocolStage(
      "Question interpretation",
      "Preserved the user's concern and identified population, intervention, outcome and high-stakes status."
    )
  );
  await emit("understanding", "Question preserved as a child-specific treatment-risk question.");

  const searchPlan = await analysisProvider.generateSearchPlan(interpretation);
  protocolStages.push(
    completedProtocolStage(
      "Search-plan generation",
      `${searchPlan.tracks.length} retrieval tracks were generated across dominant claims, original evidence, guidance, contradictions and incentives.`
    )
  );

  const retrievedResults = await searchProvider.search(searchPlan);
  const extractedDocuments = await Promise.all(
    retrievedResults.map((result) => extractionProvider.extract(result))
  );
  protocolStages.push(
    completedProtocolStage(
      "Diverse retrieval and safe extraction",
      `${retrievedResults.length} results were retrieved through ${searchProvider.metadata.name}; page text was handled as untrusted source material.`
    )
  );

  const sources = await analysisProvider.classifySources(extractedDocuments);
  protocolStages.push(
    completedProtocolStage(
      "Source extraction and classification",
      `${sources.length} sources were classified by type and incentive separately.`
    )
  );
  await emit("original-evidence", "Original and secondary evidence were separated before synthesis.");
  await emit("incentives", "Source type and source incentive were classified as separate fields.");

  const clusters = await analysisProvider.extractClaimClusters(sources);
  protocolStages.push(
    completedProtocolStage(
      "Claim clustering and repetition removal",
      `${clusters.length} claim clusters were built so repeated webpages do not become independent evidence.`
    )
  );
  await emit("repetition", "Repeated claims were collapsed into evidence-origin clusters.");

  const matches = await analysisProvider.compareEvidenceToQuestion(sources, interpretation);
  protocolStages.push(
    completedProtocolStage(
      "Evidence-question match",
      "The protocol checked whether each source measured the user's actual concern or only a proxy outcome."
    )
  );

  const contradictions = await analysisProvider.analyzeContradictions(sources, clusters);
  protocolStages.push(
    completedProtocolStage(
      "Contradiction search",
      `${contradictions.length} credible contradictory or limiting perspectives were assessed by relevance and quality.`
    )
  );
  await emit("contradictions", "Contradictory and limiting evidence was checked without manufacturing false balance.");

  const uncertainties = await analysisProvider.constructUncertainty(sources, matches, contradictions);
  protocolStages.push(
    completedProtocolStage(
      "Uncertainty construction",
      `${uncertainties.length} material uncertainties were retained because they affect the answer.`
    )
  );
  await emit("uncertainty", "Only uncertainties that change the answer were retained.");

  const answer = await analysisProvider.synthesizeFinal({
    question: request.question,
    interpretation,
    sources,
    clusters,
    matches,
    contradictions,
    uncertainties,
    protocolStages
  });

  await emit("answer", "A validated structured answer was generated from protocol outputs.");

  return answer;
}
