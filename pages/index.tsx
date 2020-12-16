import { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";

import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Snowfall } from "../components/Snowfall";

import {
  getGameFromRequest,
  setGameInResponse,
} from "../shared/getGameFromCookies";

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

export default function Home({}: Props): JSX.Element {
  const imageContainer = css`
    width: 100%;
    padding: 1em;
  `;

  const central = css`
    text-align: center;
  `;

  const flexContainer = css`
    height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const [buttonOpacity, setButtonOpacity] = useState(0);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setButtonOpacity(1);
    }, 1000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to Glow Golf</title>
      </Head>

      <Snowfall />
      <div className={cx(flexContainer)}>
        <div className={central}>
          <div className={imageContainer}>
            <Image
              priority
              src="/logo.png"
              alt="Glow Golf Logo"
              width={250}
              height={250}
            />
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
