// Libraries
import { useCallback, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { css as css2, Global } from "@emotion/react";
import type { ParsedUrlQuery } from "querystring";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";

// Components
import { Back } from "../../components/Back";
import { Content } from "../../components/Content";
import { DarkButton } from "../../components/DarkButton";
import { DividedTable } from "../../components/DividedTable";
import { Flag } from "../../components/Flag";
import { LinkButton } from "../../components/LinkButton";
import { Menu } from "../../components/Menu";
import { ScoreInput } from "../../components/ScoreInput";

// Shared
import { MAX_SCORE, NUMBER_OF_HOLES } from "../../shared/constants";
import { getGameFromRequest } from "../../shared/getGameFromCookies";
import { getHoleColour } from "../../shared/getHoleColour";
import { getWinnerNames } from "../../shared/getWinnerNames";
import { faded } from "../../shared/styles";

interface Params extends ParsedUrlQuery {
  holeNumber: string;
}

interface Props {
  game: Game;
  hole: number;
}

const SCROLL_ENABLED = false;

export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
): Promise<GetServerSidePropsResult<Props>> {
  if (!context.params) {
    throw new Error("No route params provided");
  }

  const { holeNumber } = context.params;
  const hole = parseInt(holeNumber);
  if (isNaN(hole) || hole < 1 || hole > NUMBER_OF_HOLES) {
    return { notFound: true };
  }

  const game = await getGameFromRequest(context.req);
  if (!game) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { game, hole } };
}

function plusOne(score: number | null): number {
  if (score === null) {
    return 1;
  } else {
    return Math.min(MAX_SCORE, score + 1);
  }
}

function minusOne(score: number | null): number | null {
  if (score === null || score === 1) {
    return null;
  } else {
    return Math.max(1, score - 1);
  }
}

export default function HoleNumber({ game, hole }: Props): JSX.Element {
  const { scores, players } = game;

  const holeScores = scores.filter((scores) => scores.hole === hole);
  const [currentHoleScores, setHoleScores] = useState(holeScores);

  useEffect(() => {
    setHoleScores(scores.filter((scores) => scores.hole === hole));
  }, [scores, hole]);

  const everyPlayerHasScore = currentHoleScores.every(
    (score) => score.score !== null
  );

  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const firstRender = useRef(true);
  const hasScrolledBefore = useRef(false);
  useEffect(() => {
    // This might be obnoxious, so have a flag which kills it
    if (!SCROLL_ENABLED) return;

    // Don't scroll if were loading a page of already completed scores
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // Don't scroll if we've scrolled before - it's just a first-time hint
    if (hasScrolledBefore.current) return;

    // If they've completed all the scores, then scroll down the the 'Next Hole' button
    let timeout: number | undefined;
    if (everyPlayerHasScore) {
      timeout = window.setTimeout(() => {
        nextButtonRef.current?.scrollIntoView({ behavior: "smooth" });
        hasScrolledBefore.current = true;
      }, 1000);
    }

    return () => {
      window.clearTimeout(timeout);
    };
  }, [everyPlayerHasScore, currentHoleScores]);

  // When we change hole, reset the scroll variable
  useEffect(() => {
    hasScrolledBefore.current = false;
  }, [hole]);

  const handleIncrease = useCallback((player: string) => {
    setHoleScores((oldScores) =>
      oldScores.map((score) => {
        if (score.player === player) {
          return { ...score, score: plusOne(score.score) };
        } else {
          return score;
        }
      })
    );
  }, []);

  const handleDecrease = useCallback((player: string) => {
    setHoleScores((oldScores) =>
      oldScores.map((score) => {
        if (score.player === player) {
          return { ...score, score: minusOne(score.score) };
        } else {
          return score;
        }
      })
    );
  }, []);

  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const saveAndNavigate = useCallback(
    async (href) => {
      try {
        setSaving(true);
        const response = await fetch(`/api/hole/${hole}`, {
          method: "post",
          body: JSON.stringify(currentHoleScores),
        });
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        await router.push(href);
      } catch (error) {
        // TODO: Handle Error
      }
      setSaving(false);
    },
    [currentHoleScores, hole, router, setSaving]
  );

  // One hole one we go back to the players page
  // On all the valid holes, we go back to the previous one
  // Otherwise, go to the home page
  let backHref = "/";
  if (hole === 1) {
    backHref = `/players`;
  } else if (hole > 1 && hole <= NUMBER_OF_HOLES) {
    backHref = `/hole/${hole - 1}`;
  }

  let forwardHref = "/";
  let forwardText = "Next Hole";
  if (hole === NUMBER_OF_HOLES) {
    forwardHref = `/results`;
    forwardText = "Results";
  } else if (hole === NUMBER_OF_HOLES - 1) {
    // Special case - show the /final route
    forwardHref = `/final`;
  } else if (hole >= 1 && hole < NUMBER_OF_HOLES) {
    forwardHref = `/hole/${hole + 1}`;
  }

  const leaders = getWinnerNames(game);

  const flag = css`
    margin-top: 1rem;
    margin-bottom: 2rem;
  `;

  return (
    <>
      <Head>
        <title>Hole {hole}</title>
      </Head>

      <Global
        styles={css2`
        body {
          background: url(/holefooter.png);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: bottom;
        }`}
      />

      <Menu>
        <Back href={backHref} />
        <LinkButton
          css={faded}
          disabled={saving}
          onClick={() => saveAndNavigate("/leaderboard")}
        >
          Leaderboard
        </LinkButton>
      </Menu>
      <Flag colour={getHoleColour(hole)} css={flag}>
        Hole {hole}
      </Flag>
      <Content>
        <DividedTable>
          <tbody>
            {currentHoleScores.map((holeScore) => (
              <ScoreInput
                key={holeScore.player}
                playerName={
                  players.find((player) => player === holeScore.player) ||
                  "Unknown Player"
                }
                leading={leaders.includes(holeScore.player)}
                score={holeScore.score}
                disabled={saving}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
          </tbody>
        </DividedTable>
      </Content>
      <LinkButton
        css={faded}
        disabled={saving}
        onClick={() => saveAndNavigate("/scorecard")}
      >
        Scorecard
      </LinkButton>

      <div
        css={css`
          position: absolute;
          bottom: 4em;
          left: 0;
          right: 0;
          text-align: center;
        `}
      >
        <DarkButton
          ref={nextButtonRef}
          disabled={saving || !everyPlayerHasScore}
          onClick={() => saveAndNavigate(forwardHref)}
        >
          {forwardText}
        </DarkButton>
      </div>
    </>
  );
}
