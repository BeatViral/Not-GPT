import type { ClaimCluster } from "@/schemas/not-gpt";

export function RepetitionAudit({ clusters }: { clusters: ClaimCluster[] }) {
  return (
    <section className="rounded-lg border border-line bg-white p-5">
      <h3 className="text-lg font-semibold text-ink">Repeated claims</h3>
      <div className="mt-4 space-y-3">
        {clusters.map((cluster) => (
          <article key={cluster.id} className="rounded-lg border border-line bg-paper p-3">
            <h4 className="font-semibold text-ink">{cluster.canonicalClaim}</h4>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-ink/50">Repeats</dt>
                <dd className="font-semibold text-ink">{cluster.repetitionCount}</dd>
              </div>
              <div>
                <dt className="text-ink/50">Domains</dt>
                <dd className="font-semibold text-ink">{cluster.domainCount}</dd>
              </div>
              <div>
                <dt className="text-ink/50">Ownership groups</dt>
                <dd className="font-semibold text-ink">{cluster.ownershipGroupCount}</dd>
              </div>
              <div>
                <dt className="text-ink/50">Original evidence</dt>
                <dd className="font-semibold text-ink">{cluster.originalEvidenceCount}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
