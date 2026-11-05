import "server-only";
import { createHash } from "crypto";

/**
 * Fixed-window limiter. In-memory works per server instance; on multi-instance or
 * serverless hosting, swap the Map for Upstash Redis (same interface) – see docs/DEPLOYMENT.md.
 */
const hits = new Map<string, { count: number; reset: number }>();
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.reset < now) { hits.set(key, { count: 1, reset: now + windowMs }); return { ok: true }; }
  entry.count += 1;
  return { ok: entry.count <= limit, retryAfter: Math.ceil((entry.reset - now) / 1000) };
}
export const hashIp = (ip: string) =>
  createHash("sha256").update(ip + (process.env.SUPABASE_SERVICE_ROLE_KEY ?? "salt")).digest("hex").slice(0, 32);
export const clientIp = (h: Headers) => h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
