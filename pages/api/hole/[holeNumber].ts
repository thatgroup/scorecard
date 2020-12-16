import type { NextApiRequest, NextApiResponse } from "next";

import { getGame, updateGame } from "../../../shared/db";
import { validateScoresForHole } from "../../../shared/validateScoresForHole";

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
  const { holeNumber } = req.query;

  if (typeof holeNumber !== "string") {
    res.statusCode = 400;
    res.send("Hole Id is not valid");
    return;
  }

  const hole = parseInt(holeNumber);
  if (isNaN(hole)) {
    res.statusCode = 400;
    res.send("Hole Id is not valid");
    return;
  }

  // Validate the game ID found in the cookie
  const { gameId } = parseCookies({ req });
  if (!gameId) {
    res.statusCode = 400;
    res.send("Game ID not set");
    return;
  }

  const game = await getGame(gameId);
  if (!game) {
    res.statusCode = 400;
    res.send("Game not found");
    return;
  }

  // Validate the list of scores
  if (!req.body || typeof req.body !== "string") {
    res.statusCode = 400;
    res.send(`Invalid request body: ${JSON.stringify(req.body)}`);
    return;
  }

  const postedScores = JSON.parse(req.body || "[]") as Score[];
  if (validateScoresForHole(postedScores, hole, game.players) === false) {
    res.statusCode = 400;
    res.send("Scores are not valid");
    return;
  }

  // Remove any previous scores for this hole
  const existingScores = game.scores.filter((score) => score.hole !== hole);

  try {
    await updateGame(gameId, {
      ...game,
      scores: [...existingScores, ...postedScores],
    });
    res.statusCode = 200;
    res.end();
  } catch (error) {
    res.statusCode = 500;
    res.send("Failed to update game");
  }
}
