// Libraries
import type { ReactNode } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

interface Props {
  className?: string;
  children: ReactNode;
}

export function DividedTable({ className, children }: Props): JSX.Element {
  const theme = useTheme();

  const dividedTable = css`
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    tr > td {
      padding-top: 0.6rem;
      padding-bottom: 0.6rem;
      border-bottom: 1px solid ${theme.colours.muted};
    }

    tr:last-child > td {
      border-bottom: none;
    }
  `;
  return (
    <table css={dividedTable} className={className}>
      {children}
    </table>
  );
}
