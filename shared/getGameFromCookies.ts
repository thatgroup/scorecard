// Libraries
import { parseCookies, setCookie } from "nookies";

// Next.JS
import type { NextApiRequest, NextApiResponse } from "next";

// Libraries
import type { IncomingMessage, ServerResponse } from "http";

// Shared
import { createGame, getGame } from "./db";

export async function getGameFromRequest(
  req: NextApiRequest | IncomingMessage
): Promise<Game | null> {
  const { gameId } = parseCookies({ req });
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
