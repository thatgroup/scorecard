import { css } from "@emotion/css";

import { muted } from "../shared/colours";

export function Divider(): JSX.Element {
  const hr = css`
    height: 1px;
    background-color: ${muted};
    margin: 0.5em 0;
  `;

  return <div className={hr} />;
}
