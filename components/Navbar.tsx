import { getNextUnplayedHole } from "../shared/getNextUnplayedHole";

import { PageLink } from "./PageLink";
export interface Props {
  game: Game;
}
export default function Navbar({ game }: Props): JSX.Element {
  const nextUnplayedHole = getNextUnplayedHole(game);

  return (
    <nav>
      <PageLink href="/">Home</PageLink>
      {" | "}
      <PageLink href="/players">Players</PageLink>
      {" | "}
      {game.players.length && nextUnplayedHole !== null ? (
        <>
          <PageLink href={`/hole/${nextUnplayedHole}`}>
            Hole {nextUnplayedHole}
          </PageLink>{" "}
          {" | "}
        </>
      ) : null}
      <PageLink href="/rules">Rules</PageLink>
      {" | "}
      <PageLink href="/results">Results</PageLink>
    </nav>
  );
}
