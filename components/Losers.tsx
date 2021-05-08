// Libraries
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

// Shared
import { getLeaderBoard } from "../shared/getLeaderBoard";
import { rankToText } from "../shared/rankToText";

interface Props {
  game: Game;
}

export function Losers({ game }: Props): JSX.Element {
  const theme = useTheme();

  const rankings = getLeaderBoard(game).filter((ranking) => ranking.rank !== 1);
  const mutedHeading = css`
    color: ${theme.colours.muted};
    font-size: 2em;
    margin: 0.5em;
  `;

  return (
    <>
      {rankings.map((ranking) => (
        <h2 key={ranking.player} css={mutedHeading}>
          {rankToText(ranking.rank)} {ranking.player} - {ranking.total}
        </h2>
      ))}
    </>
  );
}
