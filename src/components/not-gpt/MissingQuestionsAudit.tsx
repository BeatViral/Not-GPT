export function MissingQuestionsAudit({ questions }: { questions: string[] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h3 className="text-lg font-semibold text-ink">Missing questions</h3>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-ink/68">
        {questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>
    </section>
  );
}
