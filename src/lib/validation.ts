import { z } from "zod";

export const remarkSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(60, "Name is too long"),
  // Optional — empty string is fine, but anything entered must look like an email.
  email: z
    .string()
    .trim()
    .max(254, "Email is too long")
    .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email"),
  rating: z.coerce.number().int().min(1, "Pick a rating").max(5, "Pick a rating"),
  remark: z
    .string()
    .trim()
    .min(10, "Say a little more (10 characters minimum)")
    .max(500, "Keep it under 500 characters"),
});

export type RemarkInput = z.infer<typeof remarkSchema>;
