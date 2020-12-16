import { NUMBER_OF_HOLES } from "./constants";
import { getBlankScores } from "./getBlankScores";

describe("getBlankScores()", () => {
  it("generates blank scores", () => {
    const players = ["adam", "barry"];
    const scores = getBlankScores(players);

    expect(scores.length).toBe(NUMBER_OF_HOLES * 2);

    players.forEach((player) => {
      for (let i = 1; i <= NUMBER_OF_HOLES; i++) {
        expect(scores).toContainEqual({ hole: i, player: player, score: null });
      }
    });
  });
});
