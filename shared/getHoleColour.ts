import { blue, green, pink, yellow } from "./colours";

const colours = [pink, yellow, green, blue];

export function getHoleColour(hole: number): string {
  return colours[hole % 4];
}
