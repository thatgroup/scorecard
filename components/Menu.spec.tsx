// Libraries
import { screen } from "@testing-library/react";
import { render } from "../test/test-utils";

// Components
import { Menu } from "./Menu";

describe("<Menu/>", () => {
  it("passes children", () => {
    render(<Menu>Find Me</Menu>);
    screen.getByText("Find Me");
  });
});
