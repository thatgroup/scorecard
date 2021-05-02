import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colours: {
      background: string;
      foreground: string;

      // Colours of the coloured buttons
      buttonRight: string;
      buttonLeft: string;

      // Colour of the -/+ buttons
      scoreButton: string;

      // Colour of the left chevron to go back
      backIcon: string;

      // Text that isn't active
      muted: string;

      // Palette
      blue: string;
      pink: string;
      yellow: string;
      green: string;
    };
  }
}
