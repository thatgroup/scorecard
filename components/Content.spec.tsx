// Libraries
import { render } from "@testing-library/react";

// Components
import { Content } from "./Content";

describe("<Content/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Content>Find Me</Content>);
    getByText("Find Me");
  });
});
