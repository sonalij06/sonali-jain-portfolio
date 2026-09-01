"use client";

import { useEffect, useRef } from "react";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  danger = false,
  pending = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="confirm-backdrop" onClick={onCancel}>
      <div
        className={danger ? "confirm-card is-danger" : "confirm-card"}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-icon" aria-hidden="true">
          {danger ? "!" : "?"}
        </div>
        <h3 id="confirm-title" className="confirm-title">
          {title}
        </h3>
        <p id="confirm-desc" className="confirm-desc">
          {description}
        </p>
        <div className="confirm-actions">
          <button
            type="button"
            className="btn btn-ghost admin-btn-sm"
            onClick={onCancel}
            disabled={pending}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmRef}
            className={danger ? "confirm-btn-danger" : "btn btn-primary admin-btn-sm"}
            onClick={onConfirm}
            disabled={pending}
          >
            {pending ? "Working…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
