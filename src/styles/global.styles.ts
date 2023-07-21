import { Theme, css } from "@emotion/react";

export const globalStyles = (theme: Theme) => css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    font-family: "Instrument Sans", sans-serif;
    background-color: ${theme.colors.lightGray};
    overflow: hidden;
  }

  input,
  textarea,
  button {
    all: unset;
    box-sizing: border-box;
  }

  h1 {
    color: ${theme.colors.darkGray};
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    margin: 0 0 8px;
  }

  h6 {
    color: ${theme.colors.darkGray};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }

  p,
  a {
    color: ${theme.colors.darkGray};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin: 0;
  }

  a {
    color: ${theme.colors.purple};
    text-decoration: none;
  }

  small {
    color: ${theme.colors.darkGray};
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin: 0;
  }
`;
