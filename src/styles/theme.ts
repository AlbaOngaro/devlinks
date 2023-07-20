import { Theme } from "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      purple: string;
      purpleHoverColor: string;
      lightPurple: string;
      darkGray: string;
      gray: string;
      borders: string;
      lightGray: string;
      white: string;
      red: string;
    };
  }
}

export const theme: Theme = {
  colors: {
    purple: "#633cff",
    purpleHoverColor: "#beadff",
    lightPurple: "#efebff",
    darkGray: "#333333",
    gray: "#737373",
    borders: "#d9d9d9",
    lightGray: "#fafafa",
    white: "#fff",
    red: "#ff3939",
  },
};
