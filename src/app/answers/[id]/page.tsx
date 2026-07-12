import { notFound } from "next/navigation";
import { AnswerRenderer } from "@/components/not-gpt/AnswerRenderer";
import { demoQuestion } from "@/data/not-gpt-demo";
import { runNotGptInvestigation } from "@/services/not-gpt/pipeline";

export default async function AnswerPage({ params }: { params: { id: string } }) {
  if (!params.id.startsWith("ans-") && params.id !== "demo") {
    notFound();
  }

  const answer = await runNotGptInvestigation({ question: demoQuestion });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <AnswerRenderer answer={{ ...answer, id: params.id === "demo" ? answer.id : params.id }} />
    </div>
  );
}
