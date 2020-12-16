import range from "lodash/range";

export const MAX_PLAYERS = 6;
export const MAX_SCORE = 6;
export const NUMBER_OF_HOLES = 18;

export const HOLES = range(1, NUMBER_OF_HOLES + 1);

// Allow letters, numbers, spaces, dashes
// TODO: Chinese / Japanese / Other character types?
export const ACCEPTED_CHARACTERS_REGEX = /^[a-zA-Z0-9\- ]+$/u;
export const MAX_PLAYER_NAME_LENGTH = 20;
