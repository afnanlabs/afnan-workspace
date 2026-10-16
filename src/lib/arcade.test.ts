import { beforeEach, describe, expect, it } from "vitest";
import {
  ARCADE_GAMES,
  getAllHighScores,
  getHighScore,
  resetHighScores,
  submitHighScore,
} from "./arcade";

const STORAGE_KEY = "afnan-arcade-highscores";

beforeEach(() => {
  localStorage.clear();
});

describe("arcade high scores", () => {
  it("starts every game at zero", () => {
    for (const game of ARCADE_GAMES) {
      expect(getHighScore(game)).toBe(0);
    }
    expect(getAllHighScores()).toEqual({
      snake: 0,
      tetris: 0,
      galaga: 0,
      pacman: 0,
    });
  });

  it("records a new personal best", () => {
    expect(submitHighScore("snake", 10)).toBe(true);
    expect(getHighScore("snake")).toBe(10);
  });

  it("ignores scores that do not beat the stored best", () => {
    submitHighScore("snake", 10);
    expect(submitHighScore("snake", 5)).toBe(false);
    expect(submitHighScore("snake", 10)).toBe(false);
    expect(getHighScore("snake")).toBe(10);
  });

  it("rejects zero and negative scores", () => {
    expect(submitHighScore("tetris", 0)).toBe(false);
    expect(submitHighScore("tetris", -25)).toBe(false);
    expect(getHighScore("tetris")).toBe(0);
  });

  it("floors fractional scores", () => {
    submitHighScore("tetris", 12.9);
    expect(getHighScore("tetris")).toBe(12);
  });

  it("keeps per-game scores independent", () => {
    submitHighScore("snake", 3);
    submitHighScore("pacman", 7);
    expect(getHighScore("snake")).toBe(3);
    expect(getHighScore("pacman")).toBe(7);
    expect(getHighScore("galaga")).toBe(0);
  });

  it("persists scores as JSON under the documented key", () => {
    submitHighScore("galaga", 42);
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw as string)).toEqual({ galaga: 42 });
  });

  it("resets every score", () => {
    submitHighScore("pacman", 99);
    submitHighScore("snake", 12);
    resetHighScores();
    expect(getAllHighScores()).toEqual({
      snake: 0,
      tetris: 0,
      galaga: 0,
      pacman: 0,
    });
  });

  it("survives corrupted storage", () => {
    localStorage.setItem(STORAGE_KEY, "not valid json {");
    expect(getHighScore("galaga")).toBe(0);
    // and recovers on the next write
    expect(submitHighScore("galaga", 5)).toBe(true);
    expect(getHighScore("galaga")).toBe(5);
  });

  it("drops malformed and non-positive stored values", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ snake: -3, tetris: "high", galaga: 8.7, pacman: null }),
    );
    expect(getHighScore("snake")).toBe(0);
    expect(getHighScore("tetris")).toBe(0);
    expect(getHighScore("galaga")).toBe(8);
    expect(getHighScore("pacman")).toBe(0);
  });
});
