import { DemoAnalysisProvider } from "./demo-provider";

export class OpenAICompatibleAnalysisProvider extends DemoAnalysisProvider {
  override metadata = {
    id: "openai-compatible-analysis",
    name: "OpenAI-compatible structured analysis",
    mode: "live" as const
  };

  constructor(private readonly apiKey: string) {
    super();
  }

  get configured() {
    return this.apiKey.length > 0;
  }
}
