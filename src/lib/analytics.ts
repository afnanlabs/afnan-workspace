// Lightweight, privacy-first analytics.
//
// Nothing leaves the browser unless VITE_ANALYTICS_ENDPOINT is configured at
// build time, so local/dev builds are completely silent. Do-Not-Track and
// Global Privacy Control are always respected.
type AnalyticsProps = Record<string, string | number | boolean | undefined>;

const ENDPOINT = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;

let initialized = false;

function privacyOptOut(): boolean {
  if (typeof window === "undefined") return true;
  const nav = navigator as Navigator & { globalPrivacyControl?: boolean };
  const dnt =
    nav.doNotTrack === "1" ||
    (window as unknown as { doNotTrack?: string }).doNotTrack === "1" ||
    nav.globalPrivacyControl === true;
  return dnt;
}

export function track(event: string, props: AnalyticsProps = {}): void {
  if (typeof window === "undefined" || privacyOptOut()) return;

  // No backend configured -> local-only no-op. This keeps the portfolio
  // dependency-free until a real collector is wired up.
  if (!ENDPOINT) return;

  const body = JSON.stringify({
    event,
    props,
    path: window.location.hash || "/",
    ts: Date.now(),
  });

  try {
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(ENDPOINT, new Blob([body], { type: "application/json" }));
      return;
    }
    void fetch(ENDPOINT, {
      method: "POST",
      body,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch(() => {});
  } catch {
    // Analytics must never break the app.
  }
}

/** Records an initial view and every subsequent hash (SPA) navigation. */
export function initAnalytics(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  track("pageview", { path: window.location.hash || "/" });
  window.addEventListener("hashchange", () => {
    track("pageview", { path: window.location.hash || "/" });
  });
}
