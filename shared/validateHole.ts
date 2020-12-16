import { NUMBER_OF_HOLES } from "./constants";

export function validateHole(hole: number): boolean {
  return typeof hole === "number" && hole >= 1 && hole <= NUMBER_OF_HOLES;
}
