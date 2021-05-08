import { getTheme } from "./theme";

const theme = getTheme();

const colours = [
  theme.colours.pink,
  theme.colours.yellow,
  theme.colours.green,
  theme.colours.blue,
];

export function getHoleColour(hole: number): string {
  return colours[hole % 4];
}
