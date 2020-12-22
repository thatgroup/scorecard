// Libraries
import { render } from "@testing-library/react";

// Shared
import { getBlankScores } from "../shared/getBlankScores";

// Components
import { Losers } from "./Losers";

describe("<Loser/>", () => {
  it("handles no scores", () => {
    const players = ["adam", "barry"];
    const scores = getBlankScores(players);
    const game: Game = { players, scores };

    const { container } = render(<Losers game={game} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("handles a single loser", () => {
    const players = ["adam", "barry"];
    const scores = getBlankScores(players).map((score) => {
      return { ...score, score: score.player === "adam" ? 1 : 2 };
    });

    const game: Game = { players, scores };

    const { getByText } = render(<Losers game={game} />);
    getByText("2nd barry - 36");
  });

  it("handles multiple losers", () => {
    const players = ["clara", "barry", "adam"];
    const scores = getBlankScores(players).map((score) => {
      if (score.player === "adam") {
        return { ...score, score: 1 };
      } else if (score.player === "barry") {
        return { ...score, score: 2 };
      } else {
        return { ...score, score: 3 };
      }
    });

    const game: Game = { players, scores };

    const { getByText } = render(<Losers game={game} />);
    getByText("2nd barry - 36");
    getByText("3rd clara - 54");
  });

  it("handles joint losers", () => {
    const players = ["clara", "barry", "adam"];
    const scores = getBlankScores(players).map((score) => {
      return { ...score, score: score.player === "adam" ? 1 : 2 };
    });

    const game: Game = { players, scores };

    const { getByText } = render(<Losers game={game} />);
    getByText("2nd barry - 36");
    getByText("2nd clara - 36");
  });
});
