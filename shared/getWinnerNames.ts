import { getLeaderBoard } from "./getLeaderBoard";

export function getWinnerNames(game: Game): string[] {
  return getLeaderBoard(game)
    .filter((ranking) => ranking.rank === 1)
    .filter((ranking) => ranking.total !== null)
    .map((ranking) => ranking.player);
}
