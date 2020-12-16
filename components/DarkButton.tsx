import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
} from "react";
import { css, cx } from "@emotion/css";

import { background, blue, foreground } from "../shared/colours";

export type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const DarkButton = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLButtonElement>) => {
    const { children, className, disabled, type = "button", ...rest } = props;

    const buttonClassName = css`
      display: inline-block;
      text-decoration: none;
      color: ${background};
      background: ${blue};
      border-radius: 100rem;
      padding: 1rem;
      font-weight: 600;
      font-size: 1.2rem;
      font-family: proxima-nova;
      padding: 0.5rem 1.5rem;
      border: solid 3px ${background};

      transition: box-shadow 200ms linear, color 200ms linear,
        opacity 200ms ease-out;

      user-select: none;

      opacity: ${disabled ? 0.3 : 1};

      &:active {
        color: ${foreground};
        background: ${background};

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
        className={cx(buttonClassName, className)}
      >
        {children}
        <img
          src="/arrow.png"
          className={image}
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
