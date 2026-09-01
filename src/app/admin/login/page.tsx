import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSession } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  if (isValidSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin");
  }

  return (
    <div className="admin-shell">
      <div className="admin-login-card">
        <div className="eyebrow">Admin</div>
        <h1 className="admin-title">Sign in</h1>
        <p className="admin-sub">Moderate remarks before they go live on the site.</p>
        <LoginForm />
      </div>
    </div>
  );
}
