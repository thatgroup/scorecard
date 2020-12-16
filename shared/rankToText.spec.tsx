import { rankToText } from "./rankToText";

describe("rankToText()", () => {
  it("handles 1", () => {
    expect(rankToText(1)).toBe("1st");
  });

  it("handles 2", () => {
    expect(rankToText(2)).toBe("2nd");
  });

  it("handles 3", () => {
    expect(rankToText(3)).toBe("3rd");
  });

  it("handles 4", () => {
    expect(rankToText(4)).toBe("4th");
  });

  it("handles 5", () => {
    expect(rankToText(5)).toBe("5th");
  });

  it("handles 6", () => {
    expect(rankToText(6)).toBe("6th");
  });

  it("handles 7", () => {
    expect(rankToText(7)).toBe("7th");
  });

  it("handles 0", () => {
    expect(rankToText(0)).toBe("0th");
  });
});
