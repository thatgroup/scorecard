// Libraries
import { css } from "@emotion/css";

// Theme
import { getTheme } from "./theme";

const theme = getTheme();

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
  color: ${theme.colours.muted};
`;
