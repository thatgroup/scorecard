// Libraries
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Link from "next/link";

// Components
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Snowfall } from "../components/Snowfall";
import { SummerAnimatedLogo } from "../components/SummerAnimatedLogo";
import { SummerBackground } from "../components/SummerBackground";
import { WinterAnimatedLogo } from "../components/WinterAnimatedLogo";

// Shared
import {
  getGameFromRequest,
  setGameInResponse,
} from "../shared/getGameFromCookies";
import { getThemeName } from "../shared/theme";

interface Props {
  game: Game;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  let game = await getGameFromRequest(context.req);
  if (!game) {
    game = await setGameInResponse(context.res);
  }

  return { props: { game } };
}

export default function Home(): JSX.Element {
  const themeName = getThemeName();
  const imageContainer = css`
    width: 100%;
    padding: 1em;
  `;

  const central = css`
    text-align: center;
  `;

  const flexContainer = css`
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const [buttonOpacity, setButtonOpacity] = useState(0);
  const buttonDelay = themeName === "SUMMER" ? 1800 : 2500; // Winter has more stuff to complete before revealing the button
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setButtonOpacity(1);
    }, buttonDelay);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [buttonDelay]);

  return (
    <>
      <Head>
        <title>Welcome to Glow Golf</title>
      </Head>

      {themeName === "SUMMER" ? <SummerBackground animated /> : <Snowfall />}
      <div css={flexContainer}>
        <div css={central}>
          <div css={imageContainer}>
            {themeName === "SUMMER" ? (
              <SummerAnimatedLogo />
            ) : (
              <WinterAnimatedLogo />
            )}
          </div>
        </div>

        <main>
          <Button
            href="/players"
            arrow
            style={{ opacity: buttonOpacity, transform: "translateZ(0)" }}
          >
            Let’s begin
          </Button>
        </main>

        <Footer>
          Not sure how to play? <Link href="/rules">Check out the rules!</Link>
        </Footer>
      </div>
    </>
  );
}
