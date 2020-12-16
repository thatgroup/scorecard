import {
  isPlayerInvalid,
  validatePlayer,
  validatePlayers,
} from "./validatePlayers";

describe("validatePlayers()", () => {
  it("handles a valid list of players", () => {
    expect(validatePlayers(["adam", "ants"])).toBe(true);
  });

  it("rejects an empty array", () => {
    expect(validatePlayers([])).toBe(false);
  });

  it("rejects an array that is too long", () => {
    expect(validatePlayers(["a", "b", "c", "d", "e", "f", "g"])).toBe(false);
  });

  it("rejects an array with an empty value", () => {
    expect(validatePlayers(["adam", "   ", "ants"])).toBe(false);
  });

  it("rejects an array with duplicate values", () => {
    expect(validatePlayers(["adam", "ants", "adam"])).toBe(false);
  });

  it("rejects an array with duplicate values with different cases", () => {
    expect(validatePlayers(["adam", "ants", "ADAM"])).toBe(false);
  });

  it("rejects an array with duplicate values with spaces", () => {
    expect(validatePlayers(["  adam", "ants", "adam  "])).toBe(false);
  });
});

describe("validatePlayer()", () => {
  it("handles a valid player", () => {
    expect(validatePlayer("adam")).toBe(true);
  });

  it("rejects a player with a long name", () => {
    expect(
      validatePlayer(
        "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch"
      )
    ).toBe(false);
  });

  it("rejects a blank player", () => {
    expect(validatePlayer("")).toBe(false);
  });

  it("rejects a player with just spaces", () => {
    expect(validatePlayer("   ")).toBe(false);
  });

  it("rejects a player with invalid characters", () => {
    expect(validatePlayer("abc!")).toBe(false);
  });
});

describe("isPlayerInvalid()", () => {
  it("handles a valid name", () => {
    expect(isPlayerInvalid("adam", ["adam", "ants"])).toBe(false);
  });

  it("rejects a duplicate name", () => {
    expect(isPlayerInvalid("adam", ["adam", "adam"])).toBe(true);
  });

  it("rejects a duplicate name with spaces", () => {
    expect(isPlayerInvalid("adam  ", ["adam  ", "  adam"])).toBe(true);
  });

  it("rejects a duplicate name with different case", () => {
    expect(isPlayerInvalid("Adam", ["adam", "Adam"])).toBe(true);
  });

  it("rejects a name or just spaces", () => {
    expect(isPlayerInvalid("  ", ["  ", "Adam"])).toBe(true);
  });

  it("accepts an empty name", () => {
    expect(isPlayerInvalid("", ["", "Adam"])).toBe(false);
  });
});
