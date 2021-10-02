/**
 * @jest-environment jsdom
 */

// Libraries
import { render } from "../test/test-utils";

// Components
import { Menu } from "./Menu";

describe("<Menu/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Menu>Find Me</Menu>);
    getByText("Find Me");
  });
});
