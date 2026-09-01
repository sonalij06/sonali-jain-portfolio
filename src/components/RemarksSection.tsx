import { supabase, supabaseConfigured } from "@/lib/supabase";
import { RemarkForm } from "@/components/RemarkForm";

type Remark = {
  id: string;
  name: string;
  rating: number;
  remark: string;
  created_at: string;
};

async function getRemarks(): Promise<Remark[]> {
  if (!supabaseConfigured || !supabase) return [];
  // No `.eq("approved", true)` here on purpose: the anon role's column
  // grant (see supabase/migrations/001_remarks.sql) deliberately excludes
  // `approved`, so filtering on it here would need column-level SELECT
  // access anon doesn't have and the query would fail. The RLS policy
  // (`using (approved = true)`) already scopes visible rows for us.
  const { data, error } = await supabase
    .from("remarks")
    .select("id, name, rating, remark, created_at")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) {
    // Next.js throws this internally while probing whether "/" can be
    // statically generated (it can't, on purpose — remarks must be fresh).
    // Expected during `next build`, not a real failure.
    if (!error.message?.includes("Dynamic server usage")) {
      console.error("getRemarks failed:", error);
    }
    return [];
  }
  return data ?? [];
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="star-row" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? "star is-filled" : "star"} aria-hidden="true">
          ★
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export async function RemarksSection() {
  const remarks = await getRemarks();

  return (
    <div className="remarks-grid">
      <div className="remarks-list">
        {remarks.length === 0 ? (
          <p className="remarks-empty">
            No remarks yet &mdash; be the first to leave one.
          </p>
        ) : (
          remarks.map((r) => (
            <div className="remark-card" key={r.id}>
              <div className="remark-head">
                <span className="remark-name">{r.name}</span>
                <span className="remark-date">{formatDate(r.created_at)}</span>
              </div>
              <Stars rating={r.rating} />
              <p className="remark-text">{r.remark}</p>
            </div>
          ))
        )}
      </div>
      <RemarkForm configured={supabaseConfigured} />
    </div>
  );
}
