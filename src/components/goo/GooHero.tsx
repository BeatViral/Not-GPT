import { Workflow } from "lucide-react";
import { brand } from "@/config/brand";

export function GooHero() {
  return (
    <section className="max-w-4xl">
      <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-moss">
        <Workflow aria-hidden="true" size={16} />
        {brand.gooExpandedName}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink sm:text-6xl">
        The opportunity protocol for the inventor economy.
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/72">
        GOO turns the missing roles around inventions into structured, machine-readable opportunities that
        humans and external AI agents can discover without paid ranking or hidden sponsorship.
      </p>
    </section>
  );
}
