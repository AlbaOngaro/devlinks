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
    media: {
      sm: string;
      md: string;
      l: string;
      xl: string;
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
  media: {
    sm: "min-width: 0px",
    md: "min-width: 768px",
    l: "min-width: 1024px",
    xl: "min-width: 1440px",
  },
};
