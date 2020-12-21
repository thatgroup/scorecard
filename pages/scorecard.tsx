// Libraries
import { useMemo } from "react";
import { css, cx } from "@emotion/css";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Image from "next/image";

// Components
import { Back } from "../components/Back";
import { Content } from "../components/Content";
import { Menu } from "../components/Menu";
import { ScoreDisplay } from "../components/ScoreDisplay";

// Shared
import { background, muted } from "../shared/colours";
import { HOLES } from "../shared/constants";
import { getGameFromRequest } from "../shared/getGameFromCookies";
import { getNextPage } from "../shared/getNextPage";
import { ScoreMap } from "../shared/scoreMap";
import { constrained } from "../shared/styles";

interface Props {
  game: Game;
  previousUrl: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const game = await getGameFromRequest(context.req);
  if (!game || !game.players.length) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // In most cases we want to control where the user goes back to.
  // In the case that they fill out all the scores for hole X and then press
  // 'Scorecard' however, we would then take them back to Hole X + 1.
  // If we have a referrer, trust that - otherwise work out where they should be
  const previousUrl = context.req.headers.referer || getNextPage(game);

  return { props: { game, previousUrl } };
}

export default function Scorecard({ game, previousUrl }: Props): JSX.Element {
  // To save a bunch of list operations, use a custom class to inspect the scores
  const { getScore } = useMemo(() => new ScoreMap(game), [game]);

  const mutedHeader = css`
    min-width: 3em;
    font-size: 1.5em;
    color: ${muted};
  `;

  const playerRow = css`
    font-weight: bold;
    font-size: 2em;
  `;

  const leadboardTable = css`
    width: 100%;
    table-layout: auto;
    text-align: left;
  `;

  const imageWrapper = css`
    padding: 3em 1em 4em;
  `;

  const dividedTable = css`
    border-collapse: collapse;
    padding-left: 2em;
    padding-right: 2em;
    tr > th {
      border-bottom: 1px solid ${muted};
    }

    tr > td,
    tr > th {
      border-right: 1px solid ${muted};
    }

    tr > td:last-child,
    tr > th:last-child {
      border-right: none;
    }
  `;

  const nameCell = css`
    padding-right: 1em;
    left: 0;
    position: sticky;
    background: ${background};
    max-width: 5em;
  `;

  const scoreCell = css`
    text-align: center;
    padding: 0.3em;
  `;

  const container = css`
    overflow-x: scroll;
  `;

  return (
    <>
      <Head>
        <title>Scorecard</title>
      </Head>
      <Menu>
        <Back href={previousUrl} />
      </Menu>
      <Content>
        <div className={imageWrapper}>
          <Image
            layout="intrinsic"
            width={384}
            height={94}
            src="/scorecard.png"
            alt="Scorecard"
          />
        </div>
      </Content>
      <div className={container}>
        <div
          className={css`
            display: inline-block;
            margin: 2em;
          `}
        >
          <table className={cx(leadboardTable, dividedTable)}>
            <thead>
              <tr>
                <th
                  className={cx(
                    mutedHeader,
                    css`
                      position: sticky;
                      left: 0;
                      background: ${background};
                    `
                  )}
                >
                  Player
                </th>
                {HOLES.map((hole) => (
                  <th key={hole} className={cx(mutedHeader, scoreCell)}>
                    {hole}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {game.players.map((player) => (
                <tr key={player} className={playerRow}>
                  <td className={cx(nameCell, constrained)}>{player}</td>
                  {HOLES.map((hole) => (
                    <td key={player + hole} className={scoreCell}>
                      <ScoreDisplay score={getScore(player, hole)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
