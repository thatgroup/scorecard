// Libraries
import { css } from "@emotion/react";

// Shared
import { MAX_SCORE } from "../shared/constants";
import { faded } from "../shared/styles";
import { validateScore } from "../shared/validateScore";

interface Props {
  score: number | null;
  notPlayed?: string;
}

export function ScoreDisplay({ score, notPlayed = "" }: Props): JSX.Element {
  const className = css`
    transition: color 200ms;
  `;

  if (!validateScore(score)) {
    return <span css={className}>Error</span>;
  } else if (score === null || score <= 0) {
    return <span css={[className, faded]}>{notPlayed}</span>;
  } else if (score === MAX_SCORE) {
    return <span css={className}>6+</span>;
  } else {
    return <span css={className}>{score}</span>;
  }
}
