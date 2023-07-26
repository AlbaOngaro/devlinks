import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  height: 100vh;
  width: 100vw;
  display: flex;

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

export const card = (theme: Theme) => css`
  margin: auto;
  height: fit-content;
  width: min(100%, 350px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);

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
