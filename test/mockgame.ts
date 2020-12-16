import { range } from "lodash";

const players = [
  "WWWWWWWWWWWWWWWWWWWW",
  "Barry",
  "Clement",
  "Dhala",
  "Eric",
  "Fatema",
];
const mockScores: { [key: string]: number } = {
  WWWWWWWWWWWWWWWWWWWW: 1,
  Barry: 2,
  Clement: 3,
  Dhala: 4,
  Eric: 5,
  Fatema: 6,
};

const scores: Score[] = [];
players.forEach((player) => {
  range(1, 19).map((hole) => {
    scores.push({ hole, player, score: mockScores[player] });
  });
});

export const mockGame: Game = {
  players,
  scores,
};
