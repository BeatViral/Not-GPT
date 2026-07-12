"use client";

import { Loader2, Search } from "lucide-react";

export function QuestionInput({
  value,
  onChange,
  onSubmit,
  disabled,
  loading
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
  loading: boolean;
}) {
  return (
    <form
      className="rounded-lg border border-line bg-white p-3 shadow-soft-line"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="not-gpt-question" className="sr-only">
        Ask NOT GPT
      </label>
      <textarea
        id="not-gpt-question"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            onSubmit();
          }
        }}
        rows={4}
        placeholder="Ask something important..."
        className="min-h-32 w-full resize-y rounded-lg border border-transparent bg-paper px-4 py-4 text-base leading-7 text-ink placeholder:text-ink/45 focus:border-signal focus:bg-white focus:outline-none"
      />
      <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/55">Enter searches. Shift + Enter adds a new line.</p>
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-4 py-3 text-sm font-semibold text-paper hover:bg-ink/90 disabled:cursor-not-allowed disabled:bg-ink/35"
        >
          {loading ? <Loader2 aria-hidden="true" className="animate-spin" size={18} /> : <Search aria-hidden="true" size={18} />}
          Search with NOT GPT
        </button>
      </div>
    </form>
  );
}
