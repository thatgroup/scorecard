import { css, cx } from "@emotion/css";

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
    <Link href={href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={cx({ [active]: router.asPath === href })}>{children}</a>
    </Link>
  );
}
