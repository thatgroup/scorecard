import { css, cx } from "@emotion/css";

export interface Props {
  children: React.ReactNode;
}

export function Footer({ children }: Props): JSX.Element {
  // Put it at the bottom
  const atBottom = css`
    position: fixed;
    bottom: 1em;
    left: 1em;
    right: 1em;
  `;

  // Make sure it's central
  const central = css`
    text-align: center;

    @media (min-width: 420px) {
      text-align: right;
    }
  `;

  return <footer className={cx(atBottom, central)}>{children}</footer>;
}
