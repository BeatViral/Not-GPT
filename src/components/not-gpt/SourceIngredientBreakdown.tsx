import type { NotGptAnswer } from "@/schemas/not-gpt";

export function SourceIngredientBreakdown({
  ingredients
}: {
  ingredients: NotGptAnswer["audit"]["ingredients"];
}) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h3 className="text-lg font-semibold text-ink">Answer ingredients</h3>
      <div className="mt-4 space-y-3">
        {ingredients.map((ingredient) => (
          <div key={ingredient.label} className="rounded-lg border border-line bg-paper p-3">
            <div className="flex items-center justify-between gap-4">
              <span className="font-semibold text-ink">{ingredient.label}</span>
              <span className="text-sm font-semibold text-signal">{ingredient.count}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink/65">{ingredient.notes}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
