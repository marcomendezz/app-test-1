/**
 * Simple in-memory sliding-window rate limiter for serverless environments.
 *
 * Limitations:
 * - State is per-instance — each serverless cold start resets counts.
 * - Not suitable for distributed rate limiting across multiple instances.
 * - For production at scale, swap this for Upstash Redis (@upstash/ratelimit).
 *
 * Despite these limitations, this still provides meaningful protection
 * against brute-force attacks within a single serverless instance lifetime.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes to prevent memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;

  for (const [key, entry] of store) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);
    if (entry.timestamps.length === 0) store.delete(key);
  }
}

interface RateLimitOptions {
  /** Maximum number of requests allowed within the window. */
  maxAttempts: number;
  /** Time window in milliseconds. */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  retryAfterMs: number;
}

export function rateLimit(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const { maxAttempts, windowMs } = options;
  const now = Date.now();

  cleanup(windowMs);

  const entry = store.get(key) ?? { timestamps: [] };

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter((t) => now - t < windowMs);

  if (entry.timestamps.length >= maxAttempts) {
    const oldestInWindow = entry.timestamps[0];
    const retryAfterMs = windowMs - (now - oldestInWindow);
    return { success: false, remaining: 0, retryAfterMs };
  }

  entry.timestamps.push(now);
  store.set(key, entry);

  return {
    success: true,
    remaining: maxAttempts - entry.timestamps.length,
    retryAfterMs: 0,
  };
}
