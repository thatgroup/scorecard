import { HOLES } from "./constants";

export function getBlankScores(players: string[]): Score[] {
  const scores: Score[] = [];
  const score = null;
  HOLES.forEach((hole) => {
    players.forEach((player) => {
      scores.push({ hole, player, score });
    });
  });
  return scores;
}
