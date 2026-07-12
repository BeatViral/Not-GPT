import { brand } from "@/config/brand";

export function SearchHero() {
  return (
    <section className="max-w-4xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-moss">{brand.notGptTagline}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink sm:text-6xl">
        AI converts the commercially engineered internet into answers.
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/72">
        Not GPT doesn&apos;t.
      </p>
    </section>
  );
}
