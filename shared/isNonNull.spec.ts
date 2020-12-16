import { isNonNull } from "./isNonNull";

const player = "adam";
const hole = 1;
describe("isNonNull", () => {
  it("handles null", () => {
    expect(isNonNull({ hole, player, score: null })).toBe(false);
  });

  it("handles non-null", () => {
    expect(isNonNull({ hole, player, score: 1 })).toBe(true);
  });
});
