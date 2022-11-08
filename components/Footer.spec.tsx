// Libraries
import { screen } from "@testing-library/react";
import { render } from "../test/test-utils";

// Components
import { Footer } from "./Footer";

describe("<Footer/>", () => {
  it("passes children", () => {
    render(<Footer>Find Me</Footer>);
    screen.getByText("Find Me");
  });
});
