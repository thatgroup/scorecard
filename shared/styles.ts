import { css } from "@emotion/css";

import { muted } from "./colours";

export const constrained = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const center = css`
  text-align: center;
`;

export const noLongPress = css`
  user-select: none;
`;

export const faded = css`
  color: ${muted};
`;
