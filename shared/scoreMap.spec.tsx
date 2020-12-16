import { ScoreMap } from "./scoreMap";

describe("scoreMap", () => {
  it("handles a normal set of scores", () => {
    const game: Game = {
      players: ["adam", "barry"],
      scores: [
        { hole: 1, player: "adam", score: 1 },
        { hole: 1, player: "barry", score: 3 },
        { hole: 2, player: "adam", score: 1 },
        { hole: 2, player: "barry", score: 4 },
      ],
    };
    const scoreMap = new ScoreMap(game);

    expect(scoreMap.getScore("adam", 1)).toBe(1);
    expect(scoreMap.getScore("barry", 1)).toBe(3);
    expect(scoreMap.getScore("adam", 2)).toBe(1);
    expect(scoreMap.getScore("barry", 2)).toBe(4);
  });

  it("rejects invalid requests", () => {
    const game: Game = {
      players: ["adam", "barry"],
      scores: [
        { hole: 1, player: "adam", score: 1 },
        { hole: 1, player: "barry", score: 3 },
        { hole: 2, player: "adam", score: 1 },
        { hole: 2, player: "barry", score: 4 },
      ],
    };
    const scoreMap = new ScoreMap(game);

    expect(scoreMap.getScore("blergh", 1)).toBe(null);
    expect(scoreMap.getScore("adam", 20)).toBe(null);
  });
});
