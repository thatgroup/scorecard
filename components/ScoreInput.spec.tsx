// Libraries
import type { ReactElement, ReactNode } from "react";
import { screen } from "@testing-library/react";
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
    it("handles null", async () => {
      render(<ScoreInput {...props} score={null} />, {
        wrapper,
      });

      screen.getByText(NOT_PLAYED);

      expect(screen.getByText(MINUS)).toBeDisabled();
      try {
        await userEvent.click(screen.getByText(MINUS));
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toContain("Unable to perform pointer interaction");
        } else {
          throw new Error("Thrown error was the wrong type");
        }
      }

      expect(onDecrease).not.toHaveBeenCalled();

      await userEvent.click(screen.getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 1", async () => {
      render(<ScoreInput {...props} score={1} />, {
        wrapper,
      });

      screen.getByText("1");

      await userEvent.click(screen.getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      await userEvent.click(screen.getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 2", async () => {
      render(<ScoreInput {...props} score={2} />);

      screen.getByText("2");

      await userEvent.click(screen.getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      await userEvent.click(screen.getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 3", async () => {
      render(<ScoreInput {...props} score={3} />);

      screen.getByText("3");

      await userEvent.click(screen.getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      await userEvent.click(screen.getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 4", async () => {
      render(<ScoreInput {...props} score={4} />);

      screen.getByText("4");

      await userEvent.click(screen.getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      await userEvent.click(screen.getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 5", async () => {
      render(<ScoreInput {...props} score={5} />);

      screen.getByText("5");

      await userEvent.click(screen.getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      await userEvent.click(screen.getByText(PLUS));
      expect(onIncrease).toHaveBeenCalled();
    });

    it("handles 6", async () => {
      render(<ScoreInput {...props} score={6} />);

      screen.getByText(SIX_PLUS);

      await userEvent.click(screen.getByText(MINUS));
      expect(onDecrease).toHaveBeenCalled();

      expect(screen.getByText(PLUS)).toBeDisabled();

      try {
        await userEvent.click(screen.getByText(PLUS));
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toContain("Unable to perform pointer interaction");
        } else {
          throw new Error("Thrown error was the wrong type");
        }
      }

      expect(onIncrease).not.toHaveBeenCalled();
    });
  });

  describe("error cases", () => {
    it("handles 0", () => {
      render(<ScoreInput {...props} score={0} />);

      screen.getByText(ERROR);

      expect(screen.getByText(MINUS)).toBeDisabled();
      expect(screen.getByText(PLUS)).toBeDisabled();
    });

    it("handles 7", () => {
      render(<ScoreInput {...props} score={7} />);

      screen.getByText(ERROR);
      expect(screen.getByText(MINUS)).toBeDisabled();
      expect(screen.getByText(PLUS)).toBeDisabled();
    });
  });
});
