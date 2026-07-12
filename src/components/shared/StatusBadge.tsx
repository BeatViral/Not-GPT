import { cx } from "@/lib/utils";

export function StatusBadge({
  children,
  tone = "neutral"
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "danger" | "info";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-lg border px-2.5 py-1 text-xs font-semibold",
        tone === "neutral" && "border-line bg-white text-ink/70",
        tone === "good" && "border-moss/25 bg-moss/10 text-moss",
        tone === "warn" && "border-caution/25 bg-caution/10 text-caution",
        tone === "danger" && "border-rust/25 bg-rust/10 text-rust",
        tone === "info" && "border-signal/25 bg-signal/10 text-signal"
      )}
    >
      {children}
    </span>
  );
}
