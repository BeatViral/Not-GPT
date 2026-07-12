import { AlertTriangle } from "lucide-react";

export function HighStakesNotice({ notice }: { notice: string }) {
  return (
    <div className="rounded-lg border border-signal/25 bg-signal/10 p-4 text-signal">
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden="true" className="mt-0.5" size={18} />
        <p className="text-sm leading-6">{notice}</p>
      </div>
    </div>
  );
}
