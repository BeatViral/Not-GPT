import { AdminGate } from "@/components/goo/AdminGate";
import { EmptyState } from "@/components/shared/EmptyState";
import { listDemoInterests } from "@/services/goo/interests";

export default function AdminInterestsPage() {
  const interests = listDemoInterests();

  return (
    <AdminGate>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-line bg-white p-5">
          <h1 className="text-2xl font-semibold text-ink">Expressions of interest</h1>
          <p className="mt-2 text-sm leading-6 text-ink/65">
            Review fit information, update status, request more information, export records and add private notes.
          </p>
          <div className="mt-5">
            {interests.length === 0 ? (
              <EmptyState
                title="No interest records yet"
                body="Demo submissions appear here for the current server process. Supabase persistence is defined in the migration."
              />
            ) : (
              <div className="space-y-3">
                {interests.map((interest) => (
                  <article key={interest.id} className="rounded-lg border border-line bg-paper p-4">
                    <h2 className="font-semibold text-ink">{interest.name}</h2>
                    <p className="text-sm text-ink/60">{interest.email}</p>
                    <p className="mt-2 text-sm leading-6 text-ink/68">{interest.reasonForInterest}</p>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </AdminGate>
  );
}
