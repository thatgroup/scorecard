import { arraysContainSameStrings } from "./arraysContainSameStrings";
import { validateHole } from "./validateHole";
import { validatePlayers } from "./validatePlayers";
import { validateScore } from "./validateScore";

export function validateScoresForHole(
  scores: Score[],
  hole: number,
  players: string[]
): boolean {
  if (!validateHole(hole)) {
    return false;
  }

  if (!validatePlayers(players)) {
    return false;
  }

  const playersFromScores = scores.map((score) => score.player);
  if (arraysContainSameStrings(players, playersFromScores) === false) {
    return false;
  }

  if (!scores.every((score) => score.hole === hole)) {
    return false;
  }

  if (!scores.every((score) => validateScore(score.score))) {
    return false;
  }

  return true;
}
