import { isNonNull } from "./isNonNull";

export function getTotalForPlayer(
  player: string,
  scores: Score[]
): number | null {
  const playerScores: number[] = scores
    .filter((score) => score.player === player)
    .filter(isNonNull)
    .map((score) => score.score);

  if (!playerScores.length) {
    return null;
  }

  return playerScores.reduce((prev, curr) => prev + curr, 0);
}
