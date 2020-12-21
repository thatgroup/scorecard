// Libraries
import { css } from "@emotion/css";

// Shared
import { muted } from "../shared/colours";
import { getLeaderBoard } from "../shared/getLeaderBoard";
import { rankToText } from "../shared/rankToText";

interface Props {
  game: Game;
}

export function Losers({ game }: Props): JSX.Element {
  const rankings = getLeaderBoard(game).filter((ranking) => ranking.rank !== 1);
  const mutedHeading = css`
    color: ${muted};
    font-size: 2em;
    margin: 0.5em;
  `;

  return (
    <>
      {rankings.map((ranking) => (
        <h2 key={ranking.player} className={mutedHeading}>
          {rankToText(ranking.rank)} {ranking.player} - {ranking.total}
        </h2>
      ))}
    </>
  );
}
