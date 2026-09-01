import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSession } from "@/lib/admin-auth";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabase-admin";
import { logoutAdmin } from "@/app/admin/actions";
import { RemarkActions } from "./RemarkActions";

type Remark = {
  id: string;
  name: string;
  email: string;
  rating: number;
  remark: string;
  approved: boolean;
  created_at: string;
};

async function getAllRemarks(): Promise<Remark[]> {
  if (!supabaseAdminConfigured || !supabaseAdmin) return [];
  const { data, error } = await supabaseAdmin
    .from("remarks")
    .select("id, name, email, rating, remark, approved, created_at")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  if (!isValidSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin/login");
  }

  if (!supabaseAdminConfigured) {
    return (
      <div className="admin-shell">
        <p className="remark-form-note">
          SUPABASE_SERVICE_ROLE_KEY isn&rsquo;t set on this deployment, so the admin can&rsquo;t reach the
          database yet.
        </p>
      </div>
    );
  }

  const remarks = await getAllRemarks();
  const pendingCount = remarks.filter((r) => !r.approved).length;

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <div>
          <div className="eyebrow">Admin</div>
          <h1 className="admin-title">Remarks</h1>
          <p className="admin-sub">
            {pendingCount} pending &middot; {remarks.length} total
          </p>
        </div>
        <form action={logoutAdmin}>
          <button type="submit" className="btn btn-ghost admin-btn-sm">
            Sign out
          </button>
        </form>
      </div>

      {remarks.length === 0 ? (
        <p className="remarks-empty">No remarks submitted yet.</p>
      ) : (
        <div className="admin-table">
          {remarks.map((r) => (
            <div className={r.approved ? "admin-row" : "admin-row is-pending"} key={r.id}>
              <div className="admin-row-main">
                <div className="admin-row-head">
                  <span className="remark-name">{r.name}</span>
                  <span className={r.approved ? "admin-badge is-live" : "admin-badge"}>
                    {r.approved ? "Published" : "Pending"}
                  </span>
                  <span className="star-row" aria-label={`${r.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={i < r.rating ? "star is-filled" : "star"} aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </span>
                </div>
                <p className="remark-text">{r.remark}</p>
                <div className="admin-row-meta">
                  <span>{r.email || "no email"}</span>
                  <span>{formatDateTime(r.created_at)}</span>
                </div>
              </div>
              <RemarkActions id={r.id} approved={r.approved} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
