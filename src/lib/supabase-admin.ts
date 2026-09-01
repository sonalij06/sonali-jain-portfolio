import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdminConfigured = Boolean(url && serviceKey);

// Service-role client — bypasses row-level security entirely. Only ever
// import this from server-only code (server actions, server components).
// The "server-only" import above makes any accidental client-side import
// fail the build instead of silently leaking the key to the browser.
export const supabaseAdmin = supabaseAdminConfigured
  ? createClient(url!, serviceKey!, {
      global: { fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }) },
    })
  : null;
