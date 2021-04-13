// Libraries
import { memo, useCallback } from "react";
import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";

// Shared
import { MAX_SCORE } from "../shared/constants";
import { validateScore } from "../shared/validateScore";

// Components
import { ScoreButton } from "./ScoreButton";
import { ScoreDisplay } from "./ScoreDisplay";

interface Props {
  playerName: string;
  score: number | null;
  disabled?: boolean;
  leading?: boolean;
  onIncrease: (playerName: string) => void;
  onDecrease: (playerName: string) => void;
}

function InnerScoreInput({
  playerName,
  score,
  disabled = false,
  leading = false,
  onIncrease,
  onDecrease,
}: Props): JSX.Element {
  const theme = useTheme();
  const nameCell = css`
    font-size: 2em;
    font-weight: bold;
    padding-top: 0.3em;
    padding-bottom: 0.3em;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const scoreCell = css`
    width: 3em;
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
  `;

  const buttonCell = css`
    width: 2em;
  `;

  const currentLeader = css`
    color: ${theme.colours.yellow};
  `;

  const invalidScore = !validateScore(score);

  const handleIncrease = useCallback(() => onIncrease(playerName), [
    onIncrease,
    playerName,
  ]);

  const handleDecrease = useCallback(() => onDecrease(playerName), [
    onDecrease,
    playerName,
  ]);

  const minusButtonDisabled = disabled || invalidScore || score === null;
  const plusButtonDisabled =
    disabled || invalidScore || (score !== null && score >= MAX_SCORE);

  return (
    <tr>
      <td className={cx(nameCell, { [currentLeader]: leading })}>
        {playerName}
      </td>
      <td className={buttonCell}>
        <ScoreButton onClick={handleDecrease} disabled={minusButtonDisabled}>
          &ndash;
        </ScoreButton>
      </td>
      <td className={scoreCell}>
        <ScoreDisplay score={score} notPlayed="?" />
      </td>
      <td className={buttonCell}>
        <ScoreButton onClick={handleIncrease} disabled={plusButtonDisabled}>
          +
        </ScoreButton>
      </td>
    </tr>
  );
}

export const ScoreInput = memo(InnerScoreInput);
