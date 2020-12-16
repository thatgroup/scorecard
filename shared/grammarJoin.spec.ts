import { grammarJoin } from "./grammarJoin";

describe("grammarJoin", () => {
  it("handles normal values", () => {
    expect(grammarJoin(["a"])).toBe("a");
    expect(grammarJoin(["a", "b"])).toBe("a and b");
    expect(grammarJoin(["a", "b", "c"])).toBe("a, b and c");
  });

  it("handles an empty array", () => {
    expect(grammarJoin([])).toBe("");
  });

  it("rejects a string", () => {
    expect(grammarJoin("hello" as never)).toBe("");
  });

  it("rejects an array of non-strings", () => {
    expect(grammarJoin(["adam", 1] as never)).toBe("");
  });
});
