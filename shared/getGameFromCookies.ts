import type { NextApiRequest, NextApiResponse } from "next";

import type { IncomingMessage, ServerResponse } from "http";
import { parseCookies, setCookie } from "nookies";

import { createGame, getGame } from "./db";

export async function getGameFromRequest(
  req: NextApiRequest | IncomingMessage
): Promise<Game | null> {
  const { gameId } = parseCookies({ req });
  // console.log("Request has game id", gameId);
  if (gameId) {
    return getGame(gameId);
  } else {
    return null;
  }
}

export async function setGameInResponse(
  res: NextApiResponse | ServerResponse
): Promise<Game> {
  const gameId = await createGame();
  const game = await getGame(gameId);
  if (game === null) {
    throw new Error("Failed to create Game");
  } else {
    setCookie({ res }, "gameId", gameId, {
      sameSite: "lax",
      httpOnly: true,
    });
    return game;
  }
}

export function redirectToHomePage(
  res: NextApiResponse | ServerResponse
): void {
  res.statusCode = 302;
  res.setHeader("Location", `/`);
  res.end();
}
