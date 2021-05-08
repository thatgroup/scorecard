// Libraries
import { css } from "@emotion/react";
import { useTheme } from "@emotion/react";

// Next.JS
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import Head from "next/head";

// Components
import { Back } from "../components/Back";
import { Content } from "../components/Content";
import { Divider } from "../components/Divider";
import { Menu } from "../components/Menu";

interface Props {
  previousUrl: string;
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  const previousUrl = context.req.headers.referer || "/";
  return { props: { previousUrl } };
}

export default function RulesPage({ previousUrl }: Props): JSX.Element {
  const theme = useTheme();
  const greenHeading = css`
    color: ${theme.colours.green};
  `;

  const ruleList = css`
    list-style: none;
    color: ${theme.colours.muted};
    padding-left: 0px;

    li {
      padding: 0.75rem 0;
    }
  `;

  return (
    <>
      <Head>
        <title>Rules &amp; Safety</title>
      </Head>
      <Menu>
        <Back href={previousUrl} />
      </Menu>
      <Content>
        <h1 css={greenHeading}>Rules</h1>
        <Divider />
        <ul css={ruleList}>
          <li>
            It’s simple! The player with the lowest number of shots after 18
            holes wins.
          </li>

          <li>Maximum 6 shots per hole to avoid slow play.</li>

          <li>Please keep moving and try not to hold others up behind you.</li>

          <li>All kids must be supervised by an adult.</li>
        </ul>
        <h1 css={greenHeading}>Safety</h1>
        <Divider />
        <ul css={ruleList}>
          <li>Please stick to the path.</li>
          <li>
            Do NOT retrieve lost balls from water areas. Go back to reception
            and ask for another ball.
          </li>
          <li>
            Don’t swing your club above waist height, or hit the ball too hard.
          </li>
          <li>
            This is an Adventure Golf course with bridges, steps, hazards and
            water areas. It may not be suitable for the elderly, expectant
            mothers or the very young. Please take care when on the course.
          </li>
          <li>All players play at their own risk.</li>
        </ul>
      </Content>
    </>
  );
}
