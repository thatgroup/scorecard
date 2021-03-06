// Libraries
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

// Next.JS
import Link from "next/link";

export interface Props {
  className?: string;
  style?: React.CSSProperties;
  arrow?: boolean;
  dark?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
}

export function Button({
  arrow = false,
  children,
  className,
  href,
  style,
  type = "button",
  disabled = false,
}: Props): JSX.Element {
  const theme = useTheme();

  const buttonClassName = css`
    display: inline-block;
    text-decoration: none;
    color: ${theme.colours.foreground};
    border-radius: 100rem;
    padding: 1rem;
    font-weight: 600;
    font-size: 1.2rem;
    font-family: proxima-nova;
    padding: 0.5rem 1.5rem;
    border: solid 3px transparent;
    background-image: linear-gradient(
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0)
      ),
      linear-gradient(
        45deg,
        ${theme.colours.buttonLeft},
        ${theme.colours.buttonRight}
      );
    background-origin: border-box;
    background-clip: content-box, border-box;
    box-shadow: 2px 1000px 1px ${theme.colours.background} inset;

    transition: box-shadow 200ms linear, color 200ms linear, opacity 1s ease-out;

    user-select: none;

    &:hover {
      box-shadow: none;
      color: ${theme.colours.background};

      img {
        filter: invert(1);
      }
    }
  `;

  const image = css`
    margin-left: 0.5em;
    transition: filter 200ms linear;
  `;

  const contents = (
    <>
      {children}
      {arrow ? (
        <img
          src="/arrow.png"
          css={image}
          width={78 / 4}
          height={48 / 4}
          alt=""
          aria-hidden
        />
      ) : null}
    </>
  );

  if (!!href) {
    return (
      <Link href={href}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a style={style} className={className} css={buttonClassName}>
          {contents}
        </a>
      </Link>
    );
  } else {
    return (
      <button
        style={style}
        type={type}
        disabled={disabled}
        className={className}
        css={buttonClassName}
      >
        {contents}
      </button>
    );
  }
}
