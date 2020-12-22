// Libraries
import { render } from "@testing-library/react";

// Components
import { Footer } from "./Footer";

describe("<Footer/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Footer>Find Me</Footer>);
    getByText("Find Me");
  });
});
