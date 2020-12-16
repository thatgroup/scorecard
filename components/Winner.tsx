import { css } from "@emotion/css";

import { getLeaderBoard } from "../shared/getLeaderBoard";
import { grammarJoin } from "../shared/grammarJoin";

interface Props {
  game: Game;
}

export function Winner({ game }: Props): JSX.Element | null {
  const winningRankings = getLeaderBoard(game).filter(
    (ranking) =>
      ranking.rank === 1 && ranking.total !== null && ranking.total > 0
  );

  const largeHeader = css`
    font-size: 3em;
    margin: 0.5em;
  `;

  const names = winningRankings.map((ranking) => ranking.player);
  if (!names.length) {
    return null;
  } else {
    return (
      <h1 className={largeHeader}>
        {grammarJoin(names)} - {winningRankings[0].total}
      </h1>
    );
  }
}
