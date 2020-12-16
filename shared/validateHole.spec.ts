import { validateHole } from "./validateHole";

describe("validateHole()", () => {
  it("handles normal holes", () => {
    expect(validateHole(1)).toBe(true);
    expect(validateHole(2)).toBe(true);
    expect(validateHole(3)).toBe(true);
    expect(validateHole(4)).toBe(true);
    expect(validateHole(5)).toBe(true);
    expect(validateHole(6)).toBe(true);
    expect(validateHole(7)).toBe(true);
    expect(validateHole(8)).toBe(true);
    expect(validateHole(9)).toBe(true);
    expect(validateHole(10)).toBe(true);
    expect(validateHole(11)).toBe(true);
    expect(validateHole(12)).toBe(true);
    expect(validateHole(13)).toBe(true);
    expect(validateHole(14)).toBe(true);
    expect(validateHole(15)).toBe(true);
    expect(validateHole(16)).toBe(true);
    expect(validateHole(17)).toBe(true);
    expect(validateHole(18)).toBe(true);
  });

  it("rejects invalid holes", () => {
    expect(validateHole(0)).toBe(false);
    expect(validateHole(19)).toBe(false);
    expect(validateHole(undefined as never)).toBe(false);
    expect(validateHole("hello" as never)).toBe(false);
    expect(validateHole("1" as never)).toBe(false);
    expect(validateHole([] as never)).toBe(false);
  });
});
