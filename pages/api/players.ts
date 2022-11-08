// Libraries
import isEqual from "lodash/isEqual";
import { parseCookies } from "nookies";

// Next.JS
import type { NextApiRequest, NextApiResponse } from "next";

// Shared
import { getGame, updateGame } from "../../shared/db";
import { getBlankScores } from "../../shared/getBlankScores";
import { log } from "../../shared/log";
import { validatePlayers } from "../../shared/validatePlayers";

export default async function playersHandler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    switch (req.method) {
      case "POST":
        return handlePost(req, res);
      default:
        res.statusCode = 501;
        res.send("Not Implemented");
    }
  } catch (error) {
    res.statusCode = 500;
    res.send(error instanceof Error ? error.message : "Unknown Error");
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  // Validate the game ID found in the cookie

  const { gameId } = parseCookies({ req });

  const game = await getGame(gameId);

  if (!game) {
    log(`Game not found: ${gameId}`);
    res.statusCode = 400;
    res.send("Game Not Found");
    return;
  }

  // Validate the list of players
  const postedPlayers = JSON.parse(req.body) as string[];
  if (!validatePlayers(postedPlayers)) {
    log(`Invalid player list: ${postedPlayers}`);
    res.statusCode = 400;
    res.send(`Player list is not valid: ${req.body}`);
    return;
  }

  try {
    if (!isEqual(game.players, postedPlayers)) {
      await updateGame(gameId, {
        ...game,
        players: postedPlayers,
        scores: getBlankScores(postedPlayers),
      });
    }
    res.statusCode = 200;
    res.end();
    log(`Setting ${postedPlayers.length} player(s) on game ${gameId}`);
  } catch (error) {
    res.statusCode = 400;
    res.send(error instanceof Error ? error.message : "Unknown Error");
    log(
      `Error setting players: ${
        error instanceof Error ? error.message : "Unknown Error"
      }`
    );
  }
}
