"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAdmin, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary" disabled={pending}>
      {pending ? "Signing in…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginAdmin, initialState);

  return (
    <form className="remark-form admin-login-form" action={formAction}>
      <label className="field">
        <span>Username</span>
        <input type="text" name="username" autoComplete="username" required />
      </label>
      <label className="field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="current-password" required />
      </label>
      <div className="remark-form-foot">
        <SubmitButton />
        {state.status === "error" && <span className="form-status is-err">{state.message}</span>}
      </div>
    </form>
  );
}
