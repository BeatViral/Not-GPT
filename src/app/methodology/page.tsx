import { MethodologyPanel } from "@/components/not-gpt/MethodologyPanel";

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">Methodology</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
          AI removed the advertisement but may have kept the advertiser&apos;s answer.
        </h1>
        <p className="mt-5 text-lg leading-8 text-ink/75">
          NOT GPT treats the visible internet as an evidence environment, not a neutral library. It separates
          source quality, incentive, repetition, original evidence, contradiction and uncertainty before producing
          a clean answer.
        </p>
      </div>
      <div className="mt-10">
        <MethodologyPanel />
      </div>
    </div>
  );
}
