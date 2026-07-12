"use client";

import { useState } from "react";
import type { NotGptAnswer } from "@/schemas/not-gpt";
import { AccessibleDialog } from "@/components/shared/AccessibleDialog";
import { CopyButton } from "@/components/shared/CopyButton";

export function ShareDialog({
  answer,
  children
}: {
  answer: NotGptAnswer;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const shareUrl =
    typeof window === "undefined" ? `/answers/${answer.id}` : `${window.location.origin}/answers/${answer.id}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm font-semibold text-ink shadow-soft-line hover:bg-ink/5"
      >
        {children}
      </button>
      <AccessibleDialog open={open} onClose={() => setOpen(false)} title="Share answer">
        <div className="space-y-4">
          <div className="rounded-lg border border-line bg-white p-4">
            <h3 className="font-semibold text-ink">Public share link</h3>
            <p className="mt-2 break-all text-sm text-ink/65">{shareUrl}</p>
            <div className="mt-3">
              <CopyButton text={shareUrl} label="Copy link" />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-white p-4">
            <h3 className="font-semibold text-ink">Saved history</h3>
            <p className="mt-2 text-sm leading-6 text-ink/65">
              Supabase authentication is required for private history, public toggles and durable saved answers.
              Demo mode keeps the current answer in the browser session.
            </p>
          </div>
        </div>
      </AccessibleDialog>
    </>
  );
}
