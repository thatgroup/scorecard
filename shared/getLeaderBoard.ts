import { sortBy } from "lodash";

import { getScoresForCompleteHoles } from "./getScoresForCompleteHoles";
import { getTotalForPlayer } from "./getTotalForPlayer";

export function getLeaderBoard(game: Game): Ranking[] {
  // We can only work out who's winning if everyone has completed the round
  const scoresForCompleteHoles = getScoresForCompleteHoles(game);

  let rankings: Ranking[] = game.players.map((player) => ({
    player,
    total: getTotalForPlayer(player, scoresForCompleteHoles),
    // These get updated later
    joint: false,
    rank: 0,
    trailing: 0,
  }));

  rankings = sortBy(rankings, (ranking) => ranking.total, "player");
  const bestScore = rankings[0]?.total;

  rankings.forEach((ranking, index) => {
    // If other players have the same score, this is a joint result
    const allRankingsWithSameTotal = rankings.filter(
      (otherRanking) => otherRanking.total === ranking.total
    );
    ranking.joint = allRankingsWithSameTotal.length > 1;

    // Find the first instance of that score - that's our rank too
    const firstIndexOfMatchingTotal = rankings.findIndex(
      (otherRanking) => otherRanking.total === ranking.total
    );

    ranking.rank = Math.min(index, firstIndexOfMatchingTotal) + 1;

    // Work out how far behind the leader we are
    ranking.trailing =
      ranking.total !== null && bestScore !== null
        ? ranking.total - bestScore
        : null;
  });

  return rankings;
}
