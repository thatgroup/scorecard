// Libraries
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Image from "next/legacy/image";

// Components
import { Back } from "../components/Back";
import { Content } from "../components/Content";
import { DividedTable } from "../components/DividedTable";
import { Menu } from "../components/Menu";

// Shared
import { getGameFromRequest } from "../shared/getGameFromCookies";
import { getLeaderBoard } from "../shared/getLeaderBoard";
import { getNextPage } from "../shared/getNextPage";
import { rankToText } from "../shared/rankToText";
import { center, constrained } from "../shared/styles";

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
  // 'Leaderboard' however, we would then take them back to Hole X + 1.
  // If we have a referrer, trust that - otherwise work out where they should be
  const previousUrl = context.req.headers.referer || getNextPage(game);

  return { props: { game, previousUrl } };
}

export default function Leaderboard({ game, previousUrl }: Props): JSX.Element {
  const theme = useTheme();
  const rankCell = css`
    color: ${theme.colours.pink};
    text-align: left;
    padding-right: 5px;
    width: 2em;
  `;

  const nameCell = css``;

  const totalCell = css`
    min-width: 1.5em;
    color: ${theme.colours.muted};
    width: 2em;
  `;

  const leadboardTable = css`
    width: 100%;
    table-layout: auto;
    text-align: left;
    font-size: 2em;
    font-weight: bold;
  `;

  const imageWrapper = css`
    padding: 3em 1em 6em;
  `;

  return (
    <>
      <Head>
        <title>Leaderboard</title>
      </Head>
      <Menu>
        <Back href={previousUrl} />
      </Menu>
      <Content css={center}>
        <div css={imageWrapper}>
          <Image
            layout="intrinsic"
            width={384}
            height={94}
            src="/leaderboard.png"
            alt="Leaderboard"
          />
        </div>

        <DividedTable css={leadboardTable}>
          <tbody>
            {getLeaderBoard(game).map((ranking) => (
              <tr key={ranking.player}>
                <td css={rankCell}>{rankToText(ranking.rank)}</td>
                <td css={[nameCell, constrained]}>{ranking.player}</td>
                <td css={totalCell}>{ranking.total}</td>
              </tr>
            ))}
          </tbody>
        </DividedTable>
      </Content>
      <img
        width="100%"
        src="/leaderboardfooter.png"
        style={{ paddingTop: "3em" }}
        alt="Leaderboard footer"
      />
    </>
  );
}
