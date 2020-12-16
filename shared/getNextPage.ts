import { getNextUnplayedHole } from "./getNextUnplayedHole";

export function getNextPage(game: Game): string {
  let href = "/";
  const nextHole = getNextUnplayedHole(game);
  if (nextHole) {
    href = `/hole/${nextHole}`;
  } else {
    href = "/results";
  }
  return href;
}
