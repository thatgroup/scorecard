/**
 * @jest-environment jsdom
 */

// Libraries
import { render } from "../test/test-utils";

// Components
import { Footer } from "./Footer";

describe("<Footer/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Footer>Find Me</Footer>);
    getByText("Find Me");
  });
});
