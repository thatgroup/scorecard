import { useEffect, useState } from "react";
import { css, cx } from "@emotion/css";

import { blue, pink } from "../shared/colours";

const WIDTH = 250;
const HEIGHT = 250;
const GLOW_HEX_ALPHA = "BB";
const STEP_MS = 300;

export function AnimatedLogo(): JSX.Element {
  const [outer, setOuter] = useState(false);
  const [tophalf, setTophalf] = useState(false);
  const [victoriafalls, setVictoriafalls] = useState(false);
  const [glowgolf, setGlowgolf] = useState(false);
  const [bath, setBath] = useState(false);

  useEffect(() => {
    const outerTimeout = window.setTimeout(() => {
      setOuter(true);
    }, 4.5 * STEP_MS);
    const tophalfTimeout = window.setTimeout(() => {
      setTophalf(true);
    }, 4 * STEP_MS);
    const victoriafallsTimeout = window.setTimeout(() => {
      setVictoriafalls(true);
    }, 2 * STEP_MS);
    const glowgolfTimeout = window.setTimeout(() => {
      setGlowgolf(true);
    }, 1 * STEP_MS);
    const bathTimeout = window.setTimeout(() => {
      setBath(true);
    }, 2.5 * STEP_MS);

    return () => {
      window.clearTimeout(outerTimeout);
      window.clearTimeout(tophalfTimeout);
      window.clearTimeout(victoriafallsTimeout);
      window.clearTimeout(glowgolfTimeout);
      window.clearTimeout(bathTimeout);
    };
  }, []);

  const container = css`
    position: relative;
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
  `;

  const visible = css`
    position: absolute;
    top: 0px;
    left: 0px;

    opacity: 1;
  `;

  const flickering = css`
    animation: flicker 1s linear;

    @keyframes flicker {
      0%,
      19.999%,
      22%,
      62.999%,
      64%,
      64.999%,
      70%,
      100% {
        opacity: 0.99;
      }
      20%,
      21.999%,
      63%,
      63.999%,
      65%,
      69.999% {
        opacity: 0.4;
      }
    }
  `;

  const hidden = css`
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
  `;

  const whiteGlow = css`
    filter: drop-shadow(0px 0px 3px #ffffff ${GLOW_HEX_ALPHA});
  `;

  const pinkGlow = css`
    filter: drop-shadow(0px 0px 3px ${pink}${GLOW_HEX_ALPHA});
  `;

  const blueGlow = css`
    filter: drop-shadow(0px 0px 3px ${blue}${GLOW_HEX_ALPHA});
  `;

  const common = {
    width: WIDTH,
    height: HEIGHT,
  };
  return (
    <div className={container}>
      <img
        className={outer ? hidden : visible}
        src="/logo-outer-off.png"
        alt=""
        {...common}
      />
      <img
        className={outer ? cx(visible, flickering, blueGlow) : hidden}
        src="/logo-outer-on.png"
        alt=""
        {...common}
      />

      <img
        className={tophalf ? hidden : visible}
        src="/logo-tophalf-off.png"
        alt=""
        {...common}
      />
      <img
        className={tophalf ? cx(visible, flickering, blueGlow) : hidden}
        src="/logo-tophalf-on.png"
        alt=""
        {...common}
      />

      <img
        className={victoriafalls ? hidden : visible}
        src="/logo-victoriafalls-off.png"
        alt=""
        {...common}
      />
      <img
        className={victoriafalls ? cx(visible, flickering, whiteGlow) : hidden}
        src="/logo-victoriafalls-on.png"
        alt=""
        {...common}
      />

      <img
        className={glowgolf ? hidden : visible}
        src="/logo-glowgolf-off.png"
        alt=""
        {...common}
      />
      <img
        className={glowgolf ? cx(visible, flickering, pinkGlow) : hidden}
        src="/logo-glowgolf-on.png"
        alt=""
        {...common}
      />

      <img
        className={bath ? hidden : visible}
        src="/logo-bath-off.png"
        alt=""
        {...common}
      />
      <img
        className={bath ? cx(visible, flickering, whiteGlow) : hidden}
        src="/logo-bath-on.png"
        alt=""
        {...common}
      />
    </div>
  );
}
