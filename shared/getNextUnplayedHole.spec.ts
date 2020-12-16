import { getNextUnplayedHole } from "./getNextUnplayedHole";

const player = "adam";
const score = 1;
const completeGame: Game = {
  players: [player],
  scores: [
    { hole: 1, player, score },
    { hole: 2, player, score },
    { hole: 3, player, score },
    { hole: 4, player, score },
    { hole: 5, player, score },
    { hole: 6, player, score },
    { hole: 7, player, score },
    { hole: 8, player, score },
    { hole: 9, player, score },
    { hole: 10, player, score },
    { hole: 11, player, score },
    { hole: 12, player, score },
    { hole: 13, player, score },
    { hole: 14, player, score },
    { hole: 15, player, score },
    { hole: 16, player, score },
    { hole: 17, player, score },
    { hole: 18, player, score },
  ],
};

const incompleteGame: Game = {
  players: [player],
  scores: [
    { hole: 1, player, score },
    { hole: 2, player, score },
    { hole: 3, player, score },
    { hole: 4, player, score },
    { hole: 5, player, score },
    { hole: 6, player, score },
    { hole: 7, player, score },
    { hole: 8, player, score: null },
    { hole: 9, player, score: null },
    { hole: 10, player, score: null },
    { hole: 11, player, score: null },
    { hole: 12, player, score: null },
    { hole: 13, player, score: null },
    { hole: 14, player, score: null },
    { hole: 15, player, score: null },
    { hole: 16, player, score: null },
    { hole: 17, player, score: null },
    { hole: 18, player, score: null },
  ],
};

describe("getNextUnplayedHole()", () => {
  it("returns the next hole in an incomplete game", () => {
    expect(getNextUnplayedHole(incompleteGame)).toBe(8);
  });

  it("returns null in an complete game", () => {
    expect(getNextUnplayedHole(completeGame)).toBe(null);
  });
});
