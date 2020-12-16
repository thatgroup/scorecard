import { validateScoresForHole } from "./validateScoresForHole";

describe("validateScoresForHole", () => {
  const hole = 1;
  const players = ["adam", "barry"];

  function checkRejection(scores: Score[]) {
    expect(validateScoresForHole(scores, hole, players)).toBe(false);
  }

  function checkAcceptance(scores: Score[]) {
    expect(validateScoresForHole(scores, hole, players)).toBe(true);
  }

  it("rejects no scores", () => {
    expect(validateScoresForHole([], hole, [])).toBe(false);
  });

  it("rejects missing scores", () => {
    checkRejection([{ hole, player: "adam", score: 1 }]);
  });

  it("rejects extra scores", () => {
    checkRejection([
      { hole, player: "adam", score: 1 },
      { hole, player: "barry", score: 1 },
      { hole, player: "carla", score: 1 },
    ]);
  });

  it("rejects  scores for the wrong hole", () => {
    checkRejection([
      { hole: 2, player: "adam", score: 1 },
      { hole: 2, player: "barry", score: 1 },
    ]);
  });

  it("accepts scores", () => {
    checkAcceptance([
      { hole, player: "adam", score: 1 },
      { hole, player: "barry", score: 1 },
    ]);
  });

  it("rejects an invalid hole", () => {
    const scores = [{ hole: 19, player: "adam", score: 1 }];
    expect(validateScoresForHole(scores, 19, players)).toBe(false);
  });

  it("rejects an invalid score", () => {
    checkRejection([
      { hole: 1, player: "adam", score: 100 },
      { hole: 1, player: "barry", score: 1 },
    ]);
  });
});
