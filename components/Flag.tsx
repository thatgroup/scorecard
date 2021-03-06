// Libraries
import type { ReactNode } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

export interface Props {
  colour: string;
  className?: string;
  children: ReactNode;
}

const flagHeight = 4;

// A CSS hack to have a zero-sized div with a big border.
// This allows a triangle to be cut out off the right-hand side,
// whilst also having full control of the colour
export function Flag({ colour, className, children }: Props): JSX.Element {
  const theme = useTheme();

  const flagWrapper = css`
    position: relative;
    height: ${flagHeight}rem;
  `;

  const flag = css`
    position: absolute;
    display: inline-block;
    background: ${colour};
    border: ${flagHeight / 2}rem solid ${theme.colours.background};
    border-top-color: transparent;
    border-bottom-color: transparent;
    border-left: none;
    height: 0;
    width: 10em;
    transition: background 300ms;
  `;

  const flagText = css`
    position: absolute;
    color: black;
    margin-top: 1rem;
    padding-left: 1.5rem;
    font-family: "proxima-nova";
    font-size: 1.6em;
    font-weight: bold;
  `;

  return (
    <div css={flagWrapper} className={className}>
      <div css={flag} />
      <h1 css={flagText}>{children}</h1>
    </div>
  );
}
