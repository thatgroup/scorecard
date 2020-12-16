import { isArray } from "lodash";

export function grammarJoin(strings: string[]): string {
  if (!isArray(strings)) {
    return "";
  }
  if (strings.some((string) => typeof string !== "string")) {
    return "";
  }
  switch (strings.length) {
    case 0:
      return "";
    case 1:
      return strings[0];
    default:
      return `${strings.slice(0, -1).join(", ")} and ${strings.slice(-1)}`;
  }
}
