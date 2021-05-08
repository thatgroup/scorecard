// Libraries
import { render } from "../test/test-utils";

// Components
import { Content } from "./Content";

describe("<Content/>", () => {
  it("passes children", () => {
    const { getByText } = render(<Content>Find Me</Content>);
    getByText("Find Me");
  });
});
