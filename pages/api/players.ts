import type { NextApiRequest, NextApiResponse } from "next";

import { getGame, updateGame } from "../../shared/db";
import { getBlankScores } from "../../shared/getBlankScores";
import { log } from "../../shared/log";
import { validatePlayers } from "../../shared/validatePlayers";

import isEqual from "lodash/isEqual";
import { parseCookies } from "nookies";

export default async function (
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
    res.send(error.message);
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
    res.send("Player list is not valid");
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
  } catch (error) {
    res.statusCode = 400;
    res.send(error.message);
  }
}
