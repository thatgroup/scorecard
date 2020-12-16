function makeKey(player: string, hole: number): string {
  return `${player}-${hole}`;
}

// Define this here as return types on arrow functions are ugly
type GetScore = (player: string, hole: number) => number | null;

// A class which allows easy lookups of player scores by hole
export class ScoreMap {
  private map = new Map<string, number | null>();

  constructor(game: Game) {
    game.scores.forEach((score) => {
      const key = makeKey(score.player, score.hole);
      this.map.set(key, score.score);
    });
  }

  getScore: GetScore = (player: string, hole: number) => {
    return this.map.get(makeKey(player, hole)) || null;
  };
}
