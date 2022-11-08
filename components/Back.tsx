// Libraries
import { css } from "@emotion/react";

import Image from "next/image";
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
    <Link href={href} css={link}>
      <Image src="/chevron.png" aria-hidden width={7} height={10} alt="" /> Back
    </Link>
  );
}
