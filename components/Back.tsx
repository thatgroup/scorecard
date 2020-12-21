// Libraries
import { css } from "@emotion/css";

// Next.JS
import Link from "next/link";

export interface BackProps {
  href: string;
}

export function Back({ href }: BackProps): JSX.Element {
  const link = css`
    display: inline-block;
    text-decoration: none;
    padding: 1em;
  `;

  return (
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={link}>
        <img src="/chevron.png" aria-hidden width={7} height={10} alt="" /> Back
      </a>
    </Link>
  );
}
