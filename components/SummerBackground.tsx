//Libraries
import { useEffect, useState } from "react";
import { css } from "@emotion/react";

import Image from "next/image";

const LEFT_CLOUD_WIDTH = 522;
const LEFT_CLOUD_HEIGHT = 293;
const RIGHT_CLOUD_WIDTH = 357;
const RIGHT_CLOUD_HEIGHT = 285;

const STEP_MS = 600;

export interface Props {
  animated?: boolean;
}

export function SummerBackground({ animated = false }: Props): JSX.Element {
  const [leftCloudHidden, setLeftCloudHidden] = useState(animated);
  const [rightCloudHidden, setRightCloudHidden] = useState(animated);

  useEffect(() => {
    if (!animated) return;
    const leftTimeout = window.setTimeout(() => {
      setLeftCloudHidden(false);
    }, 1 * STEP_MS);

    const rightTimeout = window.setTimeout(() => {
      setRightCloudHidden(false);
    }, 1.5 * STEP_MS);

    return () => {
      window.clearTimeout(leftTimeout);
      window.clearTimeout(rightTimeout);
    };
  }, [animated]);

  const cloud = css`
    position: absolute;
    width: auto;
    height: auto;
    transition: left ${STEP_MS}ms, right ${STEP_MS}ms;
  `;
  const leftCloud = css`
    position: absolute;
    top: 5%;
    left: 0;

    max-width: 45%;
  `;

  const hiddenLeftCloud = css`
    left: -45%;
  `;

  const hiddenRightCloud = css`
    right: -30%;
  `;
  const rightCloud = css`
    position: absolute;
    top: 70%;
    right: 0;
    max-width: 30%;
  `;

  return (
    <>
      <Image
        css={[cloud, leftCloud, leftCloudHidden ? hiddenLeftCloud : null]}
        src="/left-cloud.png"
        alt=""
        width={LEFT_CLOUD_WIDTH}
        height={LEFT_CLOUD_HEIGHT}
      />
      <Image
        css={[cloud, rightCloud, rightCloudHidden ? hiddenRightCloud : null]}
        src="/right-cloud.png"
        alt=""
        width={RIGHT_CLOUD_WIDTH}
        height={RIGHT_CLOUD_HEIGHT}
      />
    </>
  );
}
