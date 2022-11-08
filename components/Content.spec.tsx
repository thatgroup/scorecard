// Libraries
import { screen } from "@testing-library/react";
import { render } from "../test/test-utils";

// Components
import { Content } from "./Content";

describe("<Content/>", () => {
  it("passes children", () => {
    render(<Content>Find Me</Content>);
    screen.getByText("Find Me");
  });
});
