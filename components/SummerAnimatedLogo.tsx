//Libraries
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import Image from "next/image";

const WIDTH = 250;
const HEIGHT = 250;
const STEP_MS = 300;

export function SummerAnimatedLogo(): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const outerTimeout = window.setTimeout(() => {
      setIsVisible(true);
    }, 4.5 * STEP_MS);

    return () => {
      window.clearTimeout(outerTimeout);
    };
  }, []);

  const container = css`
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
  `;

  const image = css`
    position: absolute;
    top: 0px;
    left: 0px;

    transform: scale(0.8);
    opacity: 0;

    transition: transform ${STEP_MS}ms, opacity ${STEP_MS}ms;
  `;

  const visible = css`
    transform: scale(1);
    opacity: 1;
  `;

  return (
    <div css={container}>
      <Image
        css={[image, isVisible ? visible : null]}
        src="/summer-logo.png"
        alt=""
        width={WIDTH}
        height={HEIGHT}
      />
    </div>
  );
}
