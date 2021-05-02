// Libraries
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function LinkButton({
  children,
  className,
  ...rest
}: Props): JSX.Element {
  const theme = useTheme();
  const link = css`
    background: transparent;
    color: ${theme.colours.foreground};
    border: none;
    text-decoration: underline;
    font-size: 1em;
    padding: 1em 1.5em;
  `;
  return (
    <button {...rest} css={link} className={className}>
      {children}
    </button>
  );
}
