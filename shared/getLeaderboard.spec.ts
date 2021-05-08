import { HOLES } from "./constants";
import { getLeaderBoard } from "./getLeaderBoard";

describe("getLeaderboard", () => {
  it("handles a completed game", () => {
    const adamScores: Score[] = [];
    const barryScores: Score[] = [];
    const claraScores: Score[] = [];

    HOLES.forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: 6 });
      barryScores.push({ hole, player: "barry", score: 3 });
      claraScores.push({ hole, player: "clara", score: 1 });
    });
    const game: Game = {
      players: ["adam", "barry", "clara"],
      scores: [...adamScores, ...barryScores, ...claraScores],
    };

    const expected: Ranking[] = [
      {
        player: "clara",
        rank: 1,
        joint: false,
        total: 18,
        trailing: 0,
      },
      {
        player: "barry",
        rank: 2,
        joint: false,
        total: 54,
        trailing: 36,
      },
      {
        player: "adam",
        rank: 3,
        joint: false,
        total: 108,
        trailing: 90,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });

  it("handles a completed game with joint first", () => {
    const adamScores: Score[] = [];
    const barryScores: Score[] = [];
    const claraScores: Score[] = [];

    HOLES.forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: 1 });
      barryScores.push({ hole, player: "barry", score: 1 });
      claraScores.push({ hole, player: "clara", score: 6 });
    });
    const game: Game = {
      players: ["adam", "barry", "clara"],
      scores: [...adamScores, ...barryScores, ...claraScores],
    };

    const expected: Ranking[] = [
      {
        player: "adam",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
      {
        player: "barry",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
      {
        player: "clara",
        rank: 3,
        joint: false,
        total: 108,
        trailing: 90,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });

  it("handles a completed game with a tie", () => {
    const adamScores: Score[] = [];
    const barryScores: Score[] = [];
    const claraScores: Score[] = [];

    HOLES.forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: 1 });
      barryScores.push({ hole, player: "barry", score: 1 });
      claraScores.push({ hole, player: "clara", score: 1 });
    });
    const game: Game = {
      players: ["adam", "barry", "clara"],
      scores: [...adamScores, ...barryScores, ...claraScores],
    };

    const expected: Ranking[] = [
      {
        player: "adam",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
      {
        player: "barry",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
      {
        player: "clara",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });

  it("handles a completed game with a tie (with sorted names)", () => {
    const adamScores: Score[] = [];
    const aaronScores: Score[] = [];

    HOLES.forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: 1 });
      aaronScores.push({ hole, player: "aaron", score: 1 });
    });
    const game: Game = {
      players: ["adam", "aaron"],
      scores: [...adamScores, ...aaronScores],
    };

    const expected: Ranking[] = [
      {
        player: "aaron",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
      {
        player: "adam",
        rank: 1,
        joint: true,
        total: 18,
        trailing: 0,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });

  it("handles an incomplete game", () => {
    const adamScores: Score[] = [];
    const barryScores: Score[] = [];
    const claraScores: Score[] = [];

    HOLES.slice(0, 6).forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: 6 });
      barryScores.push({ hole, player: "barry", score: 3 });
      claraScores.push({ hole, player: "clara", score: 1 });
    });

    HOLES.slice(6).forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: null });
      barryScores.push({ hole, player: "barry", score: null });
      claraScores.push({ hole, player: "clara", score: null });
    });

    const game: Game = {
      players: ["adam", "barry", "clara"],
      scores: [...adamScores, ...barryScores, ...claraScores],
    };

    const expected: Ranking[] = [
      {
        player: "clara",
        rank: 1,
        joint: false,
        total: 6,
        trailing: 0,
      },
      {
        player: "barry",
        rank: 2,
        joint: false,
        total: 18,
        trailing: 12,
      },
      {
        player: "adam",
        rank: 3,
        joint: false,
        total: 36,
        trailing: 30,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });

  it("handles an unstarted game", () => {
    const adamScores: Score[] = [];
    const barryScores: Score[] = [];
    const claraScores: Score[] = [];

    HOLES.forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: null });
      barryScores.push({ hole, player: "barry", score: null });
      claraScores.push({ hole, player: "clara", score: null });
    });

    const game: Game = {
      players: ["adam", "barry", "clara"],
      scores: [...adamScores, ...barryScores, ...claraScores],
    };

    const expected: Ranking[] = [
      {
        player: "adam",
        rank: 1,
        joint: true,
        total: null,
        trailing: null,
      },
      {
        player: "barry",
        rank: 1,
        joint: true,
        total: null,
        trailing: null,
      },
      {
        player: "clara",
        rank: 1,
        joint: true,
        total: null,
        trailing: null,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });

  it("handles an incomplete hole", () => {
    const adamScores: Score[] = [];
    const barryScores: Score[] = [];
    const claraScores: Score[] = [];

    adamScores.push({ hole: 1, player: "adam", score: null });
    barryScores.push({ hole: 1, player: "barry", score: 2 });
    claraScores.push({ hole: 1, player: "clara", score: null });

    HOLES.slice(1).forEach((hole) => {
      adamScores.push({ hole, player: "adam", score: null });
      barryScores.push({ hole, player: "barry", score: null });
      claraScores.push({ hole, player: "clara", score: null });
    });

    const game: Game = {
      players: ["adam", "barry", "clara"],
      scores: [...adamScores, ...barryScores, ...claraScores],
    };

    const expected: Ranking[] = [
      {
        player: "adam",
        rank: 1,
        joint: true,
        total: null,
        trailing: null,
      },
      {
        player: "barry",
        rank: 1,
        joint: true,
        total: null,
        trailing: null,
      },
      {
        player: "clara",
        rank: 1,
        joint: true,
        total: null,
        trailing: null,
      },
    ];

    expect(getLeaderBoard(game)).toEqual(expected);
  });
});
