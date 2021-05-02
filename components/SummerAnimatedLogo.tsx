//Libraries
import { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";

const WIDTH = 250;
const HEIGHT = 250;
const STEP_MS = 300;

export function SummerAnimatedLogo(): JSX.Element {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const outerTimeout = window.setTimeout(() => {
      setVisible(true);
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

    opacity: 1;
    transition: transform ${STEP_MS}ms, opacity ${STEP_MS}ms;
  `;

  const hidden = css`
    transform: scale(0.8);
    opacity: 0;
  `;

  return (
    <div className={container}>
      <img
        className={cx(image, { [hidden]: !visible })}
        src="/summer-logo.png"
        alt=""
        width={WIDTH}
        height={HEIGHT}
      />
    </div>
  );
}
