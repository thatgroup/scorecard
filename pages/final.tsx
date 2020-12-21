// Libraries
import { css } from "@emotion/css";

// Next.JS
import Head from "next/head";
import Image from "next/image";

// Components
import { Back } from "../components/Back";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { Menu } from "../components/Menu";

export default function Final(): JSX.Element {
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
      <div className={imageContainer}>
        <Image
          src="/finalhole.png"
          layout="responsive"
          width="100%"
          height="auto"
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
