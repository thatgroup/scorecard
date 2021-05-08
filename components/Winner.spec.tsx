// Libraries
import { render } from "../test/test-utils";

// Shared
import { getBlankScores } from "../shared/getBlankScores";

// Components
import { Winner } from "./Winner";

describe("<Winner/>", () => {
  it("handles no scores", () => {
    const players = ["adam", "barry"];
    const scores = getBlankScores(players);
    const game: Game = { players, scores };

    const { container } = render(<Winner game={game} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("handles a single winner", () => {
    const players = ["adam", "barry"];
    const scores = getBlankScores(players).map((score) => {
      return { ...score, score: score.player === "adam" ? 1 : 2 };
    });

    const game: Game = { players, scores };

    const { getByText } = render(<Winner game={game} />);
    getByText("adam - 18");
  });

  it("handles multiple winners", () => {
    const players = ["clara", "barry", "adam"];
    const scores = getBlankScores(players).map((score) => {
      return { ...score, score: 1 };
    });

    const game: Game = { players, scores };

    const { getByText } = render(<Winner game={game} />);
    getByText("adam, barry and clara - 18");
  });
});
