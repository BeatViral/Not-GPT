import Link from "next/link";
import { brand } from "@/config/brand";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line bg-white/55">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-ink/65 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <p>
          {brand.productName}: {brand.notGptTagline} {brand.gooName}: {brand.gooTagline}
        </p>
        <div className="flex gap-4">
          <Link href="/methodology" className="hover:text-ink">
            Methodology
          </Link>
          <Link href="/goo" className="hover:text-ink">
            GOO
          </Link>
          <Link href="/admin/goo/match-lab" className="hover:text-ink">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
