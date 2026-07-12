export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="rounded-lg border border-line bg-white p-6 text-sm text-ink/70" role="status">
      {label}
    </div>
  );
}
