// https://testing-library.com/docs/react-testing-library/setup/#custom-render

// Libraries
import type { FC, ReactElement } from "react";
import { ThemeProvider } from "@emotion/react";
import { render, RenderOptions, RenderResult } from "@testing-library/react";

// Theme
import { getTheme } from "../shared/theme";

export const AllTheProviders: FC = ({ children }) => {
  const theme = getTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
