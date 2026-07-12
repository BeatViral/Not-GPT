import { brand } from "@/config/brand";

export function SearchHero() {
  return (
    <section className="max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">{brand.notGptTagline}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink sm:text-6xl">
        Don&apos;t ask what the internet says.
        <span className="block text-signal">Ask what the evidence supports.</span>
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/72">
        NOT GPT examines evidence, repetition, incentives and uncertainty underneath an answer before showing it
        to you.
      </p>
    </section>
  );
}
