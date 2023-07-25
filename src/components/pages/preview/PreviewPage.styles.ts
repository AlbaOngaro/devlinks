import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 2fr));
  grid-template-rows: min-content 1fr;
  grid-row-gap: 40px;
  padding: 24px;
  height: 100vh;
  width: 100vw;
  position: relative;

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

  & > * {
    z-index: 1;
  }
`;

export const button = css`
  width: fit-content;
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
