import { beforeEach, describe, expect, it, vi } from "vitest";
import { initAnalytics, track } from "./analytics";

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
  window.location.hash = "";
});

describe("analytics", () => {
  it("never throws when called", () => {
    expect(() => track("test_event", { a: 1, b: "two", c: true })).not.toThrow();
  });

  it("does not touch the network without a configured endpoint", () => {
    const sendBeacon = vi.fn();
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    Object.defineProperty(navigator, "sendBeacon", {
      value: sendBeacon,
      configurable: true,
    });

    track("pageview", { path: "/" });

    expect(sendBeacon).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("initialises once and can be called repeatedly", () => {
    expect(() => {
      initAnalytics();
      initAnalytics();
    }).not.toThrow();
  });
});
