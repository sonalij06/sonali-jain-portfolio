import "server-only";
import { createHash, createHmac, timingSafeEqual } from "crypto";

export const ADMIN_COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

/** Constant-time string comparison — safe even when lengths differ. */
export function safeEqual(a: string, b: string): boolean {
  return timingSafeEqual(digest(a), digest(b));
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createSessionCookieValue(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const payload = `admin:${Date.now()}`;
  const payloadB64 = Buffer.from(payload).toString("base64url");
  return `${payloadB64}.${sign(payload, secret)}`;
}

export function isValidSession(cookieValue: string | undefined): boolean {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!cookieValue || !secret) return false;

  const [payloadB64, sig] = cookieValue.split(".");
  if (!payloadB64 || !sig) return false;

  const payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  const expectedSig = sign(payload, secret);
  if (expectedSig.length !== sig.length || !safeEqual(expectedSig, sig)) return false;

  const timestamp = Number(payload.split(":")[1]);
  if (!Number.isFinite(timestamp)) return false;
  return Date.now() - timestamp < SESSION_MAX_AGE_MS;
}
