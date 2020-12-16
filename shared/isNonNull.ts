type NonNullScore = Score & { score: number };
export function isNonNull(score: Score): score is NonNullScore {
  return score.score !== null;
}
