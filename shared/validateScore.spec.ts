import { validateScore } from "./validateScore";

describe("validateScore()", () => {
  it("handles normal scores", () => {
    expect(validateScore(null)).toBe(true);
    expect(validateScore(1)).toBe(true);
    expect(validateScore(2)).toBe(true);
    expect(validateScore(3)).toBe(true);
    expect(validateScore(4)).toBe(true);
    expect(validateScore(5)).toBe(true);
    expect(validateScore(6)).toBe(true);
  });

  it("rejects invalid scores", () => {
    expect(validateScore(0)).toBe(false);
    expect(validateScore(7)).toBe(false);
    expect(validateScore(undefined as never)).toBe(false);
    expect(validateScore("hello" as never)).toBe(false);
    expect(validateScore("1" as never)).toBe(false);
    expect(validateScore([] as never)).toBe(false);
  });
});
