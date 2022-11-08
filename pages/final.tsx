// Libraries
import { css } from "@emotion/react";

// Next.JS
import Head from "next/head";
import Image from "next/image";

// Components
import { Back } from "../components/Back";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Menu } from "../components/Menu";

import { getThemeName } from "../shared/theme";

export default function Final(): JSX.Element {
  const themeName = getThemeName();
  const imageContainer = css`
    padding-top: 3em;
  `;

  return (
    <>
      <Head>
        <title>Final Hole</title>
      </Head>
      <Menu>
        <Back href="/hole/17" />
      </Menu>
      <div css={imageContainer}>
        <Image
          src={
            themeName === "SUMMER"
              ? "/summer-finalhole.png"
              : "/winter-finalhole.png"
          }
          layout="responsive"
          // width="100%" // TODO
          // height="120%" // Not sure why it needs this, but next image/squashes it!
          alt="Final Hole"
        />
      </div>
      <Footer>
        <Button href="/hole/18" arrow>
          Next hole
        </Button>
      </Footer>
    </>
  );
}
