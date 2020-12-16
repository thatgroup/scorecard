import { render } from "@testing-library/react";

import { Content } from "./Content";

describe("<Content/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Content>Find Me</Content>);
    getByText("Find Me");
  });
});
