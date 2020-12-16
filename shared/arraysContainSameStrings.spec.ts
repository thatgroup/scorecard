import { arraysContainSameStrings } from "./arraysContainSameStrings";

describe("arraysContainSameStrings()", () => {
  it("handles normal cases", () => {
    expect(arraysContainSameStrings([], [])).toBe(true);
    expect(arraysContainSameStrings(["abc"], ["abc"])).toBe(true);
    expect(arraysContainSameStrings(["abc", "xyz"], ["xyz", "abc"])).toBe(true);
  });

  it("rejects non-matching arrays", () => {
    expect(arraysContainSameStrings(["abc", "xyz"], ["abc"])).toBe(false);
    expect(arraysContainSameStrings(["abc", "abc"], ["abc"])).toBe(false);
  });
});
