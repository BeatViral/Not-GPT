"use client";

import { X } from "lucide-react";

export function AccessibleDialog({
  open,
  title,
  children,
  onClose
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-ink/35 p-4" role="presentation">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="mx-auto max-h-[90vh] max-w-3xl overflow-auto rounded-lg bg-paper p-5 shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-line pb-4">
          <h2 id="dialog-title" className="text-lg font-semibold">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-ink/65 hover:bg-ink/10"
            aria-label="Close dialog"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <div className="pt-5">{children}</div>
      </div>
    </div>
  );
}
