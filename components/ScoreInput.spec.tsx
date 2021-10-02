/**
 * @jest-environment jsdom
 */

// Libraries
import type { ReactElement, ReactNode } from "react";
import userEvent from "@testing-library/user-event";
import {
  AllTheProviders,
  render as rtlRender,
  RenderOptions,
} from "../test/test-utils";

// Components
import { ScoreInput } from "./ScoreInput";

const NOT_PLAYED = "?";
const SIX_PLUS = "6+";
const PLUS = "+";
const MINUS = "–";
const ERROR = "Error";

// It's a table row, so we need to wrap the testing render function
const wrapper = (props: { children?: ReactNode }) => (
  <AllTheProviders>
    <table>
      <tbody {...props} />
    </table>
  </AllTheProviders>
);

const render = (component: ReactElement, options?: RenderOptions) =>
  rtlRender(component, { ...options, wrapper });

describe("<ScoreInput>", () => {
  const playerName = "Player";
  const onIncrease = jest.fn();
  const onDecrease = jest.fn();

  const props = {
    playerName,
    onIncrease,
    onDecrease,
  };

  describe("normal cases", () => {
    it("handles null", () => {
      const { getByText } = render(<ScoreInput {...props} score={null} />, {
        wrapper,
      });

      getByText(NOT_PLAYED);

      expect(getByText(MINUS)).toBeDisabled();
      expect(() => userEvent.click(getByText(MINUS))).toThrow();
      expect(onDecrease).not.toHaveBeenCalled();

      userEvent.click(getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 1", () => {
      const { getByText } = render(<ScoreInput {...props} score={1} />, {
        wrapper,
      });

      getByText("1");

      userEvent.click(getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      userEvent.click(getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 2", () => {
      const { getByText } = render(<ScoreInput {...props} score={2} />);

      getByText("2");

      userEvent.click(getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      userEvent.click(getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 3", () => {
      const { getByText } = render(<ScoreInput {...props} score={3} />);

      getByText("3");

      userEvent.click(getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      userEvent.click(getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 4", () => {
      const { getByText } = render(<ScoreInput {...props} score={4} />);

      getByText("4");

      userEvent.click(getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      userEvent.click(getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 5", () => {
      const { getByText } = render(<ScoreInput {...props} score={5} />);

      getByText("5");

      userEvent.click(getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      userEvent.click(getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 6", () => {
      const { getByText } = render(<ScoreInput {...props} score={6} />);

      getByText(SIX_PLUS);

      userEvent.click(getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      expect(getByText(PLUS)).toBeDisabled();
      expect(() => userEvent.click(getByText(PLUS))).toThrow();
      expect(onIncrease).not.toHaveBeenCalled();
    });
  });

  describe("error cases", () => {
    it("handles 0", () => {
      const { getByText } = render(<ScoreInput {...props} score={0} />);

      getByText(ERROR);

      expect(getByText(MINUS)).toBeDisabled();
      expect(getByText(PLUS)).toBeDisabled();
    });

    it("handles 7", () => {
      const { getByText } = render(<ScoreInput {...props} score={7} />);

      getByText(ERROR);
      expect(getByText(MINUS)).toBeDisabled();
      expect(getByText(PLUS)).toBeDisabled();
    });
  });
});
