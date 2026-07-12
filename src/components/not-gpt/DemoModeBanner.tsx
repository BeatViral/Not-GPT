import { Database } from "lucide-react";
import { brand } from "@/config/brand";

export function DemoModeBanner() {
  return (
    <div className="rounded-lg border border-caution/30 bg-caution/10 p-4 text-caution">
      <div className="flex items-start gap-3">
        <Database aria-hidden="true" className="mt-0.5" size={18} />
        <div>
          <h2 className="font-semibold">Demonstration answer</h2>
          <p className="mt-1 text-sm leading-6">{brand.demoNotice}</p>
        </div>
      </div>
    </div>
  );
}
