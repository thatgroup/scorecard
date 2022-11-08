// Shared
import { createGame, getGame, updateGame } from "./db";
import { getBlankScores } from "./getBlankScores";

jest.mock("redis", () => {
  return {
    createClient: () => {
      const data: Record<string, string> = {};
      return {
        on: jest.fn(),
        connect: jest.fn().mockResolvedValue(null),
        exists: async (key: string) => (data[key] === undefined ? 0 : 1),
        set: async (key: string, value: string) => {
          data[key] = value;
          return "OK";
        },
        get: async (key: string) => {
          return data[key] ?? null;
        },
      };
    },
  };
});

let log: typeof globalThis.console.log;

describe("db", () => {
  beforeEach(() => {
    log = globalThis.console.log;
    globalThis.console.log = jest.fn();
  });

  afterEach(() => {
    globalThis.console.log = log;
  });

  it.only("handles creating, getting,and updating games", async () => {
    const id = await createGame();
    expect(id).not.toBeNull();

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
