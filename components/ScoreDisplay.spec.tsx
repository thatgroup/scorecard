// Libraries
import { screen } from "@testing-library/react";
import { render } from "../test/test-utils";

// Components
import { ScoreDisplay } from "./ScoreDisplay";

describe("<ScoreDisplay/>", () => {
  it("handles 1", () => {
    render(<ScoreDisplay score={1} />);
    screen.getByText("1");
  });

  it("handles 2", () => {
    render(<ScoreDisplay score={2} />);
    screen.getByText("2");
  });

  it("handles 3", () => {
    render(<ScoreDisplay score={3} />);
    screen.getByText("3");
  });

  it("handles 4", () => {
    render(<ScoreDisplay score={4} />);
    screen.getByText("4");
  });

  it("handles 5", () => {
    render(<ScoreDisplay score={5} />);
    screen.getByText("5");
  });

  it("handles 6", () => {
    render(<ScoreDisplay score={6} />);
    screen.getByText("6+");
  });

  it("handles 7", () => {
    render(<ScoreDisplay score={7} />);
    screen.getByText("Error");
  });

  it("handles null", () => {
    const { container } = render(<ScoreDisplay score={null} />);
    expect(container).toHaveTextContent("");
  });
});
