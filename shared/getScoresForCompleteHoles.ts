import { getNextUnplayedHole } from "./getNextUnplayedHole";
export function getScoresForCompleteHoles(game: Game): Score[] {
  const unplayedHole = getNextUnplayedHole(game);
  if (!unplayedHole) {
    // Game is complete
    return game.scores;
  } else {
    // There is an incomplete hole
    return game.scores.filter((score) => score.hole < unplayedHole);
  }
}
