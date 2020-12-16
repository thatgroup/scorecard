interface Score {
  player: string;
  hole: number;
  score: number | null;
}

interface Game {
  players: string[];
  scores: Score[];
}

interface Ranking {
  player: string;
  total: number | null;
  rank: number;
  joint: boolean;
  trailing: number | null;
}
