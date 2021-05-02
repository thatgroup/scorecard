import { css } from "@emotion/react";

export interface Props {
  children: React.ReactNode;
}

export function Menu({ children }: Props): JSX.Element {
  const content = css`
    height: 5em;
    padding: 1em;
    display: flex;
    justify-content: space-between;
  `;
  return <header css={content}>{children}</header>;
}
