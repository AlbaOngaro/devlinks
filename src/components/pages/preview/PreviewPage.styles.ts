import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 2fr));
  grid-template-rows: min-content 1fr;
  grid-row-gap: 40px;
  min-height: 100vh;
  width: 100vw;
  position: relative;

  @media (${theme.media.md}) {
    padding: 24px;

    &::before {
      content: "";
      height: min(40%, 357px);
      background-color: ${theme.colors.purple};
      z-index: 0;
      top: 0;
      width: 100%;
      position: absolute;
      border-radius: 0px 0px 32px 32px;
    }
  }

  & > * {
    z-index: 1;
  }
`;

export const header = (theme: Theme) => css`
  gap: 16px;
  background-color: transparent;

  @media (${theme.media.md}) {
    background-color: ${theme.colors.white};
  }
`;

export const button = (theme: Theme) => css`
  white-space: nowrap;
  width: 100%;

  @media (${theme.media.md}) {
    width: fit-content;
  }
`;

export const card = (theme: Theme) => css`
  grid-column: 1/-1;
  justify-self: center;
  align-self: center;
  width: min(100%, 350px);
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: transparent;
  align-self: self-start;

  @media (${theme.media.md}) {
    align-self: center;
    background-color: ${theme.colors.white};
    box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
  }

  & div:has(> img) {
    width: 104px;
    height: 104px;
  }

  & h3 {
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
  }

  p {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: ${theme.colors.gray};
  }

  & div:has(> ul) {
    height: auto;
  }
`;
