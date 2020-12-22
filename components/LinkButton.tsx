// Libraries
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { css, cx } from "@emotion/css";

// Shared
import { foreground } from "../shared/colours";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function LinkButton({
  children,
  className,
  ...rest
}: Props): JSX.Element {
  const link = css`
    background: transparent;
    color: ${foreground};
    border: none;
    text-decoration: underline;
    font-size: 1em;
    padding: 1em 1.5em;
  `;
  return (
    <button {...rest} className={cx(link, className)}>
      {children}
    </button>
  );
}
