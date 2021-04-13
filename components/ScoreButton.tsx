// Libraries
import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from "react";
import { css, cx } from "@emotion/css";
import { useTheme } from "@emotion/react";

// Shared
import { noLongPress } from "../shared/styles";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function InternalScoreButton({
  className,
  children,
  ...rest
}: Props): JSX.Element {
  const theme = useTheme();
  const buttonClassName = css`
    display: inline-block;
    padding: 0;
    height: 2rem;
    width: 2rem;
    box-sizing: border-box;
    text-decoration: none;
    background: transparent;
    border: 2px solid ${theme.colours.green};
    border-radius: 100px;

    font-weight: 400;
    font-size: 2em;
    font-family: proxima-nova, sans-serif;
    line-height: 0em;
    color: ${theme.colours.green};
    text-align: center;

    transition: color 200ms, border-color 200ms, background-color 200ms;

    outline: none;

    &:active {
      background-color: ${theme.colours.green};
      color: ${theme.colours.background};
    }
    &:disabled {
      pointer-events: none;
      color: ${theme.colours.muted};
      border-color: ${theme.colours.muted};
      &:active {
        background-color: ${theme.colours.muted};
      }
    }
  `;

  return (
    <button className={cx(buttonClassName, noLongPress, className)} {...rest}>
      {children}
    </button>
  );
}

export const ScoreButton = memo(InternalScoreButton);
