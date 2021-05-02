import { css } from "@emotion/react";

export interface Props {
  className?: string;
  children: React.ReactNode;
}

export function Content({ className, children }: Props): JSX.Element {
  const content = css`
    padding-left: 1.5em;
    padding-right: 1.5em;
  `;
  return (
    <main className={className} css={content}>
      {children}
    </main>
  );
}
