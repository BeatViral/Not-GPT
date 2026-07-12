"use client";

export function ExampleQuestions({
  examples,
  onSelect
}: {
  examples: string[];
  onSelect: (example: string) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2" aria-label="Example questions">
      {examples.map((example) => (
        <button
          key={example}
          type="button"
          onClick={() => onSelect(example)}
          className="rounded-lg border border-line bg-white px-3 py-2 text-left text-sm text-ink/70 hover:border-signal hover:text-ink"
        >
          {example}
        </button>
      ))}
    </div>
  );
}
