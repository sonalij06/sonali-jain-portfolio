import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

// Anon-key client. RLS policies (see supabase/migrations/001_remarks.sql)
// scope what it can read and insert — no service-role key needed here.
//
// Next.js patches global fetch() to cache by default in Server Components;
// without this, a stale "no remarks yet" response can get cached and never
// pick up new/approved rows. Remarks must always read fresh.
export const supabase = supabaseConfigured
  ? createClient(url!, anonKey!, {
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    })
  : null;
