import { getTotalForPlayer } from "./getTotalForPlayer";

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

describe("getTotalForPlayer", () => {
  it("gets the total for a completed game", () => {
    expect(getTotalForPlayer(player, completeGame.scores)).toBe(18);
  });

  it("gets the total for an incomplete game", () => {
    expect(getTotalForPlayer(player, incompleteGame.scores)).toBe(7);
  });

  it("rejects an unknown player", () => {
    expect(getTotalForPlayer("unknown", completeGame.scores)).toBe(null);
  });
});
