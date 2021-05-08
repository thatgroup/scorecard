// Libraries
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

export function Divider(): JSX.Element {
  const theme = useTheme();
  const hr = css`
    height: 1px;
    background-color: ${theme.colours.muted};
    margin: 0.5em 0;
  `;

  return <div css={hr} />;
}
