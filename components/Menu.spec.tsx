// Libraries
import { render } from "@testing-library/react";

// Components
import { Menu } from "./Menu";

describe("<Menu/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Menu>Find Me</Menu>);
    getByText("Find Me");
  });
});
