// Libraries
import { render } from "@testing-library/react";

// Components
import { ScoreDisplay } from "./ScoreDisplay";

describe("<ScoreDisplay/>", () => {
  it("handles 1", () => {
    const { getByText } = render(<ScoreDisplay score={1} />);
    getByText("1");
  });

  it("handles 2", () => {
    const { getByText } = render(<ScoreDisplay score={2} />);
    getByText("2");
  });

  it("handles 3", () => {
    const { getByText } = render(<ScoreDisplay score={3} />);
    getByText("3");
  });

  it("handles 4", () => {
    const { getByText } = render(<ScoreDisplay score={4} />);
    getByText("4");
  });

  it("handles 5", () => {
    const { getByText } = render(<ScoreDisplay score={5} />);
    getByText("5");
  });

  it("handles 6", () => {
    const { getByText } = render(<ScoreDisplay score={6} />);
    getByText("6+");
  });

  it("handles 7", () => {
    const { getByText } = render(<ScoreDisplay score={7} />);
    getByText("Error");
  });

  it("handles null", () => {
    const { container } = render(<ScoreDisplay score={null} />);
    expect(container).toHaveTextContent("");
  });
});
