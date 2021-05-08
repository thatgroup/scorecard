import type { Theme } from "@emotion/react";

const winterTheme = {
  colours: {
    background: "#171717",
    foreground: "#ffffff",
    buttonRight: "#2be879",
    buttonLeft: "#34e2ff",
    scoreButton: "#2be879",
    backIcon: "#2be879",
    muted: "#646464", // Aria-compliant
    blue: "#0097ce",
    pink: "#ff76f9",
    yellow: "#e4a204",
    green: "#35d32f",
  },
};

const summerTheme = {
  colours: {
    background: "#171717",
    foreground: "#ffffff",
    buttonRight: "#ff76f9",
    buttonLeft: "#e4a204",
    scoreButton: "#2be879",
    backIcon: "#2be879",
    muted: "#646464", // Aria-compliant
    blue: "#0097ce",
    pink: "#ff76f9",
    yellow: "#e4a204",
    green: "#35d32f",
  },
};

export function getThemeName(): "SUMMER" | "WINTER" {
  // You can't destructure process.env for 'reasons'
  // https://nextjs.org/docs/api-reference/next.config.js/environment-variables
  return process.env.THEME?.trim().toUpperCase() === "SUMMER"
    ? "SUMMER"
    : "WINTER";
}

export function getTheme(): Theme {
  return getThemeName() === "SUMMER" ? summerTheme : winterTheme;
}
