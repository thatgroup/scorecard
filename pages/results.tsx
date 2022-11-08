// Libraries
import { css } from "@emotion/react";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Image from "next/legacy/image";

// Components
import { Back } from "../components/Back";
import { Content } from "../components/Content";
import { Losers } from "../components/Losers";
import { Menu } from "../components/Menu";
import { Winner } from "../components/Winner";

// Shared
import { getGameFromRequest } from "../shared/getGameFromCookies";
import { getWinnerNames } from "../shared/getWinnerNames";
import { grammarJoin } from "../shared/grammarJoin";

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
  const previousUrl = context.req.headers.referer || "/";

  return { props: { game, previousUrl } };
}

export default function Results({ game, previousUrl }: Props): JSX.Element {
  const winnerNames = getWinnerNames(game);
  const title =
    winnerNames.length === 1
      ? `${winnerNames[0]} Wins!`
      : `${grammarJoin(winnerNames)} Win!`;

  const centerAligned = css`
    text-align: center;
  `;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Menu>
        <Back href={previousUrl} />
      </Menu>
      <Content css={centerAligned}>
        <Image width={300} height={300} src="/winner.png" alt="Winner" />
        <Winner game={game} />
        <Losers game={game} />
      </Content>
    </>
  );
}
