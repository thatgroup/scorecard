// Libraries
import isArray from "lodash/isArray";
import uniq from "lodash/uniq";

// Shared
import {
  ACCEPTED_CHARACTERS_REGEX,
  MAX_PLAYER_NAME_LENGTH,
  MAX_PLAYERS,
} from "./constants";

/**
 * Validates the list of players, including validating each player
 *
 * @param  {string[]} players the player names to validate
 * @returns {boolean} true if the list is valid, false otherwise
 */
export function validatePlayers(players: string[]): boolean {
  if (
    !isArray(players) ||
    players.length === 0 ||
    players.length > MAX_PLAYERS
  ) {
    // The array isn't the right length
    return false;
  }

  if (!players.every(validatePlayer)) {
    // One of the players is invalid
    return false;
  }

  const trimmedLowerCasePlayers = players.map((player) =>
    player.toLowerCase().trim()
  );

  if (uniq(trimmedLowerCasePlayers).length !== trimmedLowerCasePlayers.length) {
    // we have some duplicate players
    return false;
  }

  // No problems
  return true;
}

/**
 * Validates that a player name is the right length and contains valid characters
 *
 * @param {string} player name to validate
 * @return {boolean}  {boolean}
 */
export function validatePlayer(player: string): boolean {
  return (
    typeof player === "string" &&
    player.length > 0 &&
    player.length <= MAX_PLAYER_NAME_LENGTH &&
    // Check that its not just white space
    player.replace(/\s/g, "").length > 0 &&
    ACCEPTED_CHARACTERS_REGEX.test(player)
  );
}

/**
 * Check whether the name appears more than once in the list
 * Case-insensitive searching
 *
 * @param  {string} player
 * @param  {string[]} players
 * @returns boolean
 */
function isDuplicate(player: string, players: string[]): boolean {
  const trimmedLowerCasePlayer = player.toLowerCase().trim();
  const trimmedLowerCasePlayers = players.map((player) =>
    player.toLowerCase().trim()
  );
  return (
    trimmedLowerCasePlayers.indexOf(trimmedLowerCasePlayer) !==
    trimmedLowerCasePlayers.lastIndexOf(trimmedLowerCasePlayer)
  );
}

/**
 * Check whether the value of a player name input is invalid
 * We don't mind "" as that indicates an un-entered player
 * All leading and trailing spaces are removed
 *
 * @param  {string} player
 * @param  {string[]} players
 * @returns boolean
 */
export function isPlayerInvalid(player: string, players: string[]): boolean {
  if (player.length === 0) {
    return false; // Empty players aren't invalid at this point
  } else {
    const trimmedPlayer = player.trim();
    return (
      !validatePlayer(trimmedPlayer) || isDuplicate(trimmedPlayer, players)
    );
  }
}
