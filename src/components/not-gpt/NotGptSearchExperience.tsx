"use client";

import { useMemo, useState } from "react";
import { demoQuestion } from "@/data/not-gpt-demo";
import type { NotGptAnswer, PublicProgressStage } from "@/schemas/not-gpt";
import { publicProgressStages } from "@/services/not-gpt/progress";
import { ErrorState } from "@/components/shared/ErrorState";
import { AnswerRenderer } from "./AnswerRenderer";
import { ExampleQuestions } from "./ExampleQuestions";
import { QuestionInput } from "./QuestionInput";
import { SearchHero } from "./SearchHero";
import { SearchProgress } from "./SearchProgress";

const examples = [
  demoQuestion,
  "Does this supplement claim have independent evidence?",
  "Are these websites repeating one original claim?",
  "What evidence contradicts the dominant position?",
  "Is this nutrition claim based on human studies?"
];

function applyStage(stages: PublicProgressStage[], incoming: PublicProgressStage) {
  return stages.map((stage) =>
    stage.id === incoming.id
      ? {
          ...stage,
          status: incoming.status,
          summary: incoming.summary
        }
      : stage
  );
}

export function NotGptSearchExperience() {
  const [question, setQuestion] = useState(demoQuestion);
  const [answer, setAnswer] = useState<NotGptAnswer | null>(null);
  const [stages, setStages] = useState<PublicProgressStage[]>(publicProgressStages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => question.trim().length >= 8 && !loading, [question, loading]);

  async function submitQuestion() {
    if (!canSubmit) {
      return;
    }

    setLoading(true);
    setError(null);
    setAnswer(null);
    setStages(
      publicProgressStages.map((stage, index) => ({
        ...stage,
        status: index === 0 ? "active" : "pending"
      }))
    );

    try {
      const response = await fetch("/api/not-gpt/investigate/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      if (!response.body) {
        throw new Error("Streaming is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let done = false;

      while (!done) {
        const read = await reader.read();
        done = read.done;
        buffer += decoder.decode(read.value, { stream: !done });
        const events = buffer.split("\n\n");
        buffer = events.pop() ?? "";

        for (const eventBlock of events) {
          const eventLine = eventBlock.split("\n").find((line) => line.startsWith("event:"));
          const dataLine = eventBlock.split("\n").find((line) => line.startsWith("data:"));

          if (!eventLine || !dataLine) {
            continue;
          }

          const eventName = eventLine.replace("event:", "").trim();
          const data = JSON.parse(dataLine.replace("data:", "").trim()) as unknown;

          if (eventName === "stage") {
            setStages((current) => applyStage(current, data as PublicProgressStage));
          }

          if (eventName === "answer") {
            setAnswer(data as NotGptAnswer);
          }

          if (eventName === "error") {
            const parsed = data as { error?: string };
            setError(parsed.error ?? "The investigation failed.");
          }
        }
      }
    } catch {
      setError("The investigation could not be completed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SearchHero />
      <section className="mt-8 max-w-4xl" aria-label="NOT GPT search">
        <QuestionInput
          value={question}
          onChange={setQuestion}
          onSubmit={submitQuestion}
          disabled={!canSubmit}
          loading={loading}
        />
        <ExampleQuestions
          examples={examples}
          onSelect={(example) => {
            setQuestion(example);
            setAnswer(null);
          }}
        />
      </section>

      {(loading || stages.some((stage) => stage.status === "completed")) && (
        <div className="mt-8 max-w-4xl">
          <SearchProgress stages={stages} active={loading} />
        </div>
      )}

      {error && (
        <div className="mt-8 max-w-4xl">
          <ErrorState title="Answer not generated" body={error} />
        </div>
      )}

      {answer && (
        <section className="mt-10" aria-label="NOT GPT answer">
          <AnswerRenderer answer={answer} />
        </section>
      )}
    </div>
  );
}
