// Libraries
import mockRedis from "redis-mock";

// Shared
import { createGame, getGame, updateGame } from "./db";
import { getBlankScores } from "./getBlankScores";

jest.mock("redis", () => mockRedis);

let log: typeof globalThis.console.log;

describe("db", () => {
  beforeEach(() => {
    log = globalThis.console.log;
    globalThis.console.log = jest.fn();
  });

  afterEach(() => {
    globalThis.console.log = log;
  });

  it("handles creating, getting,and updating games", async () => {
    const id = await createGame();
    expect(id).not.toBeNull();
    expect(globalThis.console.log).toHaveBeenCalled();

    const game = await getGame(id);
    expect(game).toEqual({ players: [], scores: [] });

    const updatedGame: Game = {
      players: ["adam"],
      scores: getBlankScores(["adam"]),
    };

    await updateGame(id, updatedGame);
    const game2 = await getGame(id);
    expect(game2).toEqual(updatedGame);
  });
});
