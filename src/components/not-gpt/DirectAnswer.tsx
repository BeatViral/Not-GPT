export function DirectAnswer({ answer }: { answer: string }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6">
      <h2 className="text-xl font-semibold text-ink">Direct answer</h2>
      <p className="mt-3 text-lg leading-8 text-ink/80">{answer}</p>
    </section>
  );
}
