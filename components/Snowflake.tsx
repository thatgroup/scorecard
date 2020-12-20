import { memo } from "react";
import { css } from "@emotion/css";

export interface Props {
  id: string;
  x: number;
  ttl: number;
}
// A CSS-based animation which takes {ttl}ms to travel
// from the top to the bottom (or 97% of the height)
export function InternalSnowflake({ x, ttl }: Props): JSX.Element {
  const snowflake = css`
    display: block;
    position: fixed;
    width: 0.5rem;
    height: 0.5rem;
    background: #ffffff;
    opacity: 0;
    border-radius: 1rem;
    will-change: scroll;

    @keyframes fall {
      0% {
        opacity: 0;
      }
      3% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translate(0, 97vh);
        opacity: 0;
      }
    }
  `;

  // If we use the style prop here, we don't keep adding emotionc stylesheets to the DOM forever!
  return (
    <div
      style={{ left: `${x}%`, animation: `fall ${ttl}ms linear` }}
      className={snowflake}
    ></div>
  );
}

export const Snowflake = memo(InternalSnowflake);
