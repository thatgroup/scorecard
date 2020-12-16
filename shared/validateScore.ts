export function validateScore(score: null | number): boolean {
  return (
    score === null || (typeof score === "number" && score >= 1 && score <= 6)
  );
}
