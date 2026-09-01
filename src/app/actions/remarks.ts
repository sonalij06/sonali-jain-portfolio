"use server";

import { revalidatePath } from "next/cache";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { remarkSchema } from "@/lib/validation";

export type SubmitRemarkState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "rating" | "remark", string>>;
};

export async function submitRemark(
  _prevState: SubmitRemarkState,
  formData: FormData
): Promise<SubmitRemarkState> {
  if (!supabaseConfigured || !supabase) {
    return {
      status: "error",
      message: "Reviews aren't wired up yet — Supabase isn't configured on this deployment.",
    };
  }

  const parsed = remarkSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    rating: formData.get("rating"),
    remark: formData.get("remark"),
  });

  if (!parsed.success) {
    const fieldErrors: SubmitRemarkState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "rating" || key === "remark") {
        fieldErrors[key] = issue.message;
      }
    }
    return { status: "error", message: "Check the fields below.", fieldErrors };
  }

  const { error } = await supabase.from("remarks").insert(parsed.data);

  if (error) {
    return { status: "error", message: "Couldn't save that just now — try again in a moment." };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return {
    status: "success",
    message: "Thanks — your remark is in for review and will show up once it's approved.",
  };
}
