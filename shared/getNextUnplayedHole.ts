import { HOLES } from "./constants";

export function getNextUnplayedHole(game: Game): number | null {
  return (
    HOLES.find((hole) =>
      game.scores
        .filter((score) => score.hole === hole)
        .some((score) => score.score === null)
    ) || null
  );
}
