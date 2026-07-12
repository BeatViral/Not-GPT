import Link from "next/link";
import { Search, Workflow } from "lucide-react";
import { brand } from "@/config/brand";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold" aria-label="NOT GPT home">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-paper">
            <Search aria-hidden="true" size={18} />
          </span>
          <span>{brand.productName}</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm font-medium text-ink/70" aria-label="Primary navigation">
          <Link className="rounded-lg px-3 py-2 hover:bg-ink/5" href="/methodology">
            Methodology
          </Link>
          <Link className="rounded-lg px-3 py-2 hover:bg-ink/5" href="/goo">
            <span className="inline-flex items-center gap-2">
              <Workflow aria-hidden="true" size={16} />
              GOO
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
