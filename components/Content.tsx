import { css, cx } from "@emotion/css";

export interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Content({ className, children }: Props): JSX.Element {
  const content = css`
    padding-left: 1.5em;
    padding-right: 1.5em;
  `;
  return <main className={cx(content, className)}>{children}</main>;
}
