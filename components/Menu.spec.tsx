import { render } from "@testing-library/react";

import { Menu } from "./Menu";

describe("<Menu/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Menu>Find Me</Menu>);
    getByText("Find Me");
  });
});
