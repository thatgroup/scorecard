// Libraries
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
} from "react";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

import Image from "next/image";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const DarkButton = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, className, disabled, type = "button", ...rest } = props;

    const theme = useTheme();

    const buttonClassName = css`
      display: inline-block;
      text-decoration: none;
      color: ${theme.colours.background};
      background: ${theme.colours.blue};
      border-radius: 100rem;
      padding: 1rem;
      font-weight: 600;
      font-size: 1.2rem;
      font-family: proxima-nova;
      padding: 0.5rem 1.5rem;
      border: solid 3px ${theme.colours.background};

      transition: box-shadow 200ms linear, color 200ms linear,
        opacity 200ms ease-out;

      user-select: none;

      opacity: ${disabled ? 0.3 : 1};

      &:active {
        color: ${theme.colours.foreground};
        background: ${theme.colours.background};

        img {
          filter: none;
        }
      }
    `;

    const image = css`
      margin-left: 0.5em;
      transition: filter 200ms linear;
      filter: invert(1);
    `;

    return (
      <button
        {...rest}
        ref={ref}
        type={type}
        disabled={disabled}
        css={buttonClassName}
        className={className}
      >
        {children}
        <Image
          src="/arrow.png"
          css={image}
          width={78 / 4}
          height={48 / 4}
          alt=""
          aria-hidden
        />
      </button>
    );
  }
);

DarkButton.displayName = "DarkButton";
