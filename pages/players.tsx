// Libraries
import { FormEvent, useState } from "react";
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import { Back } from "../components/Back";
import { Button } from "../components/Button";
import { Content } from "../components/Content";
import { Divider } from "../components/Divider";
import { Footer } from "../components/Footer";
import { Menu } from "../components/Menu";
import { NameInput } from "../components/NameInput";

// Shared
import { getGameFromRequest } from "../shared/getGameFromCookies";
import {
  isPlayerInvalid,
  validatePlayer,
  validatePlayers,
} from "../shared/validatePlayers";

export interface Props {
  game: Game;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const game = await getGameFromRequest(context.req);
  if (!game) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { game } };
}

export default function Players({ game }: Props): JSX.Element {
  const theme = useTheme();
  // Pad out the player array with blank spaces so we always have at least 6 strings
  const playersFromGame = [...game.players, "", "", "", "", "", ""].slice(0, 6);

  // It doesn't seem worth making this configurable, so sorry for the duplication
  const [player1Name, setPlayer1Name] = useState(playersFromGame[0]);
  const [player2Name, setPlayer2Name] = useState(playersFromGame[1]);
  const [player3Name, setPlayer3Name] = useState(playersFromGame[2]);
  const [player4Name, setPlayer4Name] = useState(playersFromGame[3]);
  const [player5Name, setPlayer5Name] = useState(playersFromGame[4]);
  const [player6Name, setPlayer6Name] = useState(playersFromGame[5]);

  const allPlayers = [
    player1Name,
    player2Name,
    player3Name,
    player4Name,
    player5Name,
    player6Name,
  ];

  // The list of players which have been entered
  const nonNullPlayers = allPlayers
    .map((player) => player.trim())
    .filter((player) => player !== "");

  // Get a list of valid players that have been entered
  const validPlayers = nonNullPlayers.filter(validatePlayer);

  // We can continue if we have at least one valid player, and the list itself is valid (no duplicates etc...)
  const isValid = nonNullPlayers.length && validatePlayers(nonNullPlayers);

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`/api/players`, {
        method: "post",
        body: JSON.stringify(validPlayers),
      });
      if (!response.ok) {
        throw new Error("nope!");
      }
      router.push("/hole/1");
    } catch (error) {
      setIsSaving(false);
    }
  };

  const header = css`
    font-size: 1.65em;
    color: ${nonNullPlayers.length
      ? theme.colours.muted
      : theme.colours.foreground};
    transition: color 500ms;
  `;

  const rulesLink = css`
    color: ${theme.colours.muted};
    line-height: 3rem;
  `;

  return (
    <>
      <Head>
        <title>Players</title>
      </Head>
      <Menu>
        <Back href="/" />
      </Menu>
      <Content>
        <h1 css={header}>Please enter the player names below...</h1>
        <form onSubmit={handleSave}>
          <NameInput
            number={1}
            player={player1Name}
            disabled={isSaving}
            invalid={isPlayerInvalid(player1Name, nonNullPlayers)}
            onChange={(e) => setPlayer1Name(e.target.value)}
          />

          <Divider />
          <NameInput
            number={2}
            player={player2Name}
            disabled={isSaving}
            invalid={isPlayerInvalid(player2Name, nonNullPlayers)}
            onChange={(e) => setPlayer2Name(e.target.value)}
          />
          <Divider />

          <NameInput
            number={3}
            player={player3Name}
            disabled={isSaving}
            invalid={isPlayerInvalid(player3Name, nonNullPlayers)}
            onChange={(e) => setPlayer3Name(e.target.value)}
          />
          <Divider />

          <NameInput
            number={4}
            player={player4Name}
            disabled={isSaving}
            invalid={isPlayerInvalid(player4Name, nonNullPlayers)}
            onChange={(e) => setPlayer4Name(e.target.value)}
          />
          <Divider />

          <NameInput
            number={5}
            player={player5Name}
            disabled={isSaving}
            invalid={isPlayerInvalid(player5Name, nonNullPlayers)}
            onChange={(e) => setPlayer5Name(e.target.value)}
          />
          <Divider />

          <NameInput
            number={6}
            player={player6Name}
            disabled={isSaving}
            invalid={isPlayerInvalid(player6Name, nonNullPlayers)}
            onChange={(e) => setPlayer6Name(e.target.value)}
          />
          <Divider />
          <Link href="/rules">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a css={rulesLink}>Rules &amp; Safety</a>
          </Link>
          <Footer>
            {isValid ? (
              <Button arrow type="submit" disabled={isSaving}>
                Let’s begin
              </Button>
            ) : null}
          </Footer>
        </form>
      </Content>
    </>
  );
}
