// Libraries
import { css } from "@emotion/react";

// Next.JS
import Link from "next/link";
import { useRouter } from "next/router";

export interface Props {
  href: string;
  children: React.ReactNode;
}

export function PageLink({ href, children }: Props): JSX.Element {
  const router = useRouter();
  const active = css`
    color: #2295f3;
  `;

  return (
    <Link href={href} css={[router.asPath === href ? active : null]}>
      {children}
    </Link>
  );
}
