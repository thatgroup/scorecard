import type { Theme } from "@emotion/react";

const darkTheme = {
  colours: {
    background: "#171717",
    foreground: "#ffffff",
    buttonGreen: "#2be879",
    buttonBlue: "#34e2ff",
    scoreButton: "#2be879",
    backIcon: "#2be879",
    muted: "#646464", // Aria-compliant
    blue: "#0097ce",
    pink: "#ff76f9",
    yellow: "#e4a204",
    green: "#35d32f",
  },
};

const lightTheme = {
  colours: {
    background: "#ffffff",
    foreground: "#171717",
    buttonGreen: "#2be879",
    buttonBlue: "#34e2ff",
    scoreButton: "#2be879",
    backIcon: "#2be879",
    muted: "#646464", // Aria-compliant
    blue: "#0097ce",
    pink: "#ff76f9",
    yellow: "#e4a204",
    green: "#35d32f",
  },
};

export function getTheme(): Theme {
  // You can't destructure process.env for 'reasons'
  // https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  return process.env.THEME?.trim().toLowerCase() === "light"
    ? lightTheme
    : darkTheme;
}
