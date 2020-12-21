// Libraries
import type { ReactNode } from "react";
import { css, cx } from "@emotion/css";

// Shared
import { muted } from "../shared/colours";

interface Props {
  className?: string;
  children: ReactNode;
}

export function DividedTable({ className, children }: Props): JSX.Element {
  const dividedTable = css`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    tr > td {
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid ${muted};
    }

    tr:last-child > td {
      border-bottom: none;
    }
  `;
  return <table className={cx(className, dividedTable)}>{children}</table>;
}
