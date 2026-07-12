import { AlertTriangle } from "lucide-react";

export function ErrorState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-lg border border-rust/30 bg-rust/10 p-5 text-rust" role="alert">
      <div className="flex items-start gap-3">
        <AlertTriangle aria-hidden="true" className="mt-0.5" size={18} />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm leading-6">{body}</p>
        </div>
      </div>
    </div>
  );
}
