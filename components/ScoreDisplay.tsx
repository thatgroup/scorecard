import { css, cx } from "@emotion/css";

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
    return <span className={className}>Error</span>;
  } else if (score === null || score <= 0) {
    return <span className={cx(className, faded)}>{notPlayed}</span>;
  } else if (score === MAX_SCORE) {
    return <span className={className}>6+</span>;
  } else {
    return <span className={className}>{score}</span>;
  }
}
