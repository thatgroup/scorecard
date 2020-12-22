// Next.JS
import type { NextApiRequest, NextApiResponse } from "next";

// Shared
import { getGame, updateGame } from "../../../shared/db";

// Libraries
import { serialize } from "cookie";
import httpMocks from "node-mocks-http";

import handler from "./[holeNumber]";

jest.mock("../../../shared/db", () => ({
  createGame: jest.fn(),
  getGame: jest.fn(),
  updateGame: jest.fn(),
}));

jest.mock("../../../shared/log", () => ({
  log: jest.fn(),
}));

const getGameMock = getGame as jest.Mock;

const players = ["adam", "barry"];

describe("/hole/:id", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("handles a POST", async () => {
    getGameMock.mockResolvedValue({ players, scores: [] });

    const scores: Score[] = [
      { hole: 1, player: "adam", score: 4 },
      { hole: 1, player: "barry", score: 6 },
    ];

    const req = httpMocks.createRequest<NextApiRequest>({
      method: "POST",
      query: { holeNumber: "1" },
      body: JSON.stringify(scores) as never,
      headers: { cookie: serialize("gameId", "testgameid") },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    expect(getGame).toHaveBeenCalledWith("testgameid");
    expect(updateGame).toHaveBeenCalledWith("testgameid", {
      players: ["adam", "barry"],
      scores: [
        { hole: 1, player: "adam", score: 4 },
        { hole: 1, player: "barry", score: 6 },
      ],
    });

    expect(res._getData()).toBe("");
    expect(res.statusCode).toBe(200);
  });

  it("overwrites existing scores", async () => {
    getGameMock.mockResolvedValue({
      players,
      scores: [
        { hole: 1, player: "adam", score: 1 },
        { hole: 1, player: "barry", score: 1 },
        { hole: 2, player: "adam", score: 2 },
        { hole: 2, player: "barry", score: 2 },
      ],
    });

    const scores: Score[] = [
      { hole: 1, player: "adam", score: 4 },
      { hole: 1, player: "barry", score: 6 },
    ];

    const req = httpMocks.createRequest<NextApiRequest>({
      method: "POST",
      query: { holeNumber: "1" },
      body: JSON.stringify(scores) as never,
      headers: { cookie: serialize("gameId", "testgameid") },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    expect(getGame).toHaveBeenCalledWith("testgameid");
    expect(updateGame).toHaveBeenCalledWith("testgameid", {
      players: ["adam", "barry"],
      scores: [
        { hole: 2, player: "adam", score: 2 },
        { hole: 2, player: "barry", score: 2 },
        { hole: 1, player: "adam", score: 4 },
        { hole: 1, player: "barry", score: 6 },
      ],
    });

    expect(res._getData()).toBe("");
    expect(res.statusCode).toBe(200);
  });

  it("returns 400 if no cookie is set", async () => {
    const req = httpMocks.createRequest<NextApiRequest>({
      method: "POST",
      query: { holeNumber: "1" },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    expect(getGame).not.toHaveBeenCalled();
    expect(updateGame).not.toHaveBeenCalled();

    expect(res._getData()).toBe("Game ID not set");
    expect(res.statusCode).toBe(400);
  });

  it("returns 400 if the game cannot be found", async () => {
    getGameMock.mockResolvedValue(null);
    const req = httpMocks.createRequest<NextApiRequest>({
      method: "POST",
      query: { holeNumber: "1" },
      headers: { cookie: serialize("gameId", "testgameid") },
    });
    const res = httpMocks.createResponse<NextApiResponse>();

    await handler(req, res);

    expect(getGame).toHaveBeenCalledWith("testgameid");
    expect(updateGame).not.toHaveBeenCalled();

    expect(res._getData()).toBe("Game not found");
    expect(res.statusCode).toBe(400);
  });
});
