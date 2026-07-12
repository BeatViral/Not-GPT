import { DemoAnalysisProvider } from "./demo-provider";
import { OpenAICompatibleAnalysisProvider } from "./live-provider";
import type { AnalysisProvider } from "./provider";

export function createAnalysisProvider(): AnalysisProvider {
  if (process.env.ANALYSIS_PROVIDER === "openai" && process.env.OPENAI_API_KEY) {
    return new OpenAICompatibleAnalysisProvider(process.env.OPENAI_API_KEY);
  }

  return new DemoAnalysisProvider();
}

export type {
  AnalysisProvider,
  QuestionInterpretation,
  SynthesisInput,
  UncertaintyFinding
} from "./provider";
