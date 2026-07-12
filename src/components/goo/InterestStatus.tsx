import { CheckCircle2 } from "lucide-react";

export function InterestStatus({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-moss/30 bg-moss/10 p-4 text-moss" role="status">
      <div className="flex gap-3">
        <CheckCircle2 aria-hidden="true" className="mt-0.5" size={18} />
        <p className="text-sm leading-6">{message}</p>
      </div>
    </div>
  );
}
