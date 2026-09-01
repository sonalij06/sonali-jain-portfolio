"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { submitRemark, type SubmitRemarkState } from "@/app/actions/remarks";

const initialState: SubmitRemarkState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary magnetic" data-cursor="Send" disabled={pending}>
      {pending ? "Sending…" : "Leave a remark"}
    </button>
  );
}

export function RemarkForm({ configured }: { configured: boolean }) {
  const [state, formAction] = useActionState(submitRemark, initialState);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!configured) {
    return (
      <div className="remark-form">
        <div className="eyebrow">Leave a remark</div>
        <p className="remark-form-note">
          Reviews aren&rsquo;t wired up on this deployment yet &mdash; Supabase isn&rsquo;t configured.
        </p>
      </div>
    );
  }

  return (
    <form className="remark-form" action={formAction}>
      <div className="eyebrow">Leave a remark</div>

      <label className="field">
        <span>Name</span>
        <input type="text" name="name" placeholder="Your name" maxLength={60} required />
        {state.fieldErrors?.name && <em className="field-error">{state.fieldErrors.name}</em>}
      </label>

      <label className="field">
        <span>Email (optional)</span>
        <input type="email" name="email" placeholder="you@example.com" maxLength={254} />
        {state.fieldErrors?.email && <em className="field-error">{state.fieldErrors.email}</em>}
        <em className="field-hint">Never shown publicly — only used if we need to follow up.</em>
      </label>

      <label className="field">
        <span>Rating</span>
        <div
          className="star-picker"
          role="radiogroup"
          aria-label="Rating"
          onMouseLeave={() => setHoverRating(0)}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              className={n <= (hoverRating || rating) ? "star-btn is-filled" : "star-btn"}
              onMouseEnter={() => setHoverRating(n)}
              onClick={() => setRating(n)}
            >
              ★
            </button>
          ))}
        </div>
        <input type="hidden" name="rating" value={rating} />
        {state.fieldErrors?.rating && <em className="field-error">{state.fieldErrors.rating}</em>}
      </label>

      <label className="field">
        <span>Remark</span>
        <textarea name="remark" placeholder="What stood out to you?" rows={3} maxLength={500} required />
        {state.fieldErrors?.remark && <em className="field-error">{state.fieldErrors.remark}</em>}
      </label>

      <div className="remark-form-foot">
        <SubmitButton />
        {state.status === "success" && <span className="form-status is-ok">{state.message}</span>}
        {state.status === "error" && !state.fieldErrors && (
          <span className="form-status is-err">{state.message}</span>
        )}
      </div>
    </form>
  );
}
