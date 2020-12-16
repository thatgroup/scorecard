import { css } from "@emotion/css";

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
  return <header className={content}>{children}</header>;
}
