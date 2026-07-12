export default function AdminLoginPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-line bg-white p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-moss">Administration</p>
        <h1 className="mt-3 text-3xl font-semibold text-ink">Admin access</h1>
        <p className="mt-4 leading-7 text-ink/68">
          Production administration should use Supabase authentication and role policies. For local demonstration,
          set <code>DEMO_ADMIN_ACCESS=true</code>. API write actions can also require <code>ADMIN_API_TOKEN</code>.
        </p>
      </section>
    </div>
  );
}
