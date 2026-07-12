import Link from "next/link";
import { Lock } from "lucide-react";
import { canRenderAdminTools } from "@/lib/auth";

export function AdminGate({ children }: { children: React.ReactNode }) {
  if (!canRenderAdminTools()) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-line bg-white p-6">
          <Lock aria-hidden="true" className="text-rust" size={24} />
          <h1 className="mt-4 text-2xl font-semibold text-ink">Admin access required</h1>
          <p className="mt-3 leading-7 text-ink/68">
            GOO administration routes are protected. Set <code>DEMO_ADMIN_ACCESS=true</code> for local
            demonstration access or configure Supabase role checks and an admin token in production.
          </p>
          <Link
            href="/admin/login"
            className="mt-5 inline-flex rounded-lg border border-line px-3 py-2 text-sm font-semibold hover:bg-ink/5"
          >
            Admin login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
