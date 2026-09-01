"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE_NAME,
  createSessionCookieValue,
  isValidSession,
  safeEqual,
} from "@/lib/admin-auth";
import { supabaseAdmin, supabaseAdminConfigured } from "@/lib/supabase-admin";

export type LoginState = { status: "idle" | "error"; message?: string };

export async function loginAdmin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return { status: "error", message: "Admin login isn't configured on this deployment." };
  }
  if (!safeEqual(username, expectedUser) || !safeEqual(password, expectedPass)) {
    return { status: "error", message: "Wrong username or password." };
  }

  const token = createSessionCookieValue();
  if (!token) {
    return { status: "error", message: "ADMIN_SESSION_SECRET isn't set on this deployment." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/login");
}

async function requireAdminSession() {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!isValidSession(value)) redirect("/admin/login");
}

export async function setRemarkApproval(id: string, approved: boolean) {
  await requireAdminSession();
  if (!supabaseAdminConfigured || !supabaseAdmin) return;
  await supabaseAdmin.from("remarks").update({ approved }).eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function deleteRemark(id: string) {
  await requireAdminSession();
  if (!supabaseAdminConfigured || !supabaseAdmin) return;
  await supabaseAdmin.from("remarks").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
}
