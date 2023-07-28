import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  padding: 32px;

  @media (${theme.media.md}) {
    padding: 32px;
    align-items: center;
    justify-content: center;
  }
`;

export const card = (theme: Theme) => css`
  width: min(100%, 476px);
  height: fit-content;
  gap: 40px;
  margin: 64px auto 0;
  padding: 0;
  background-color: ${theme.colors.lightGray};

  & a {
    display: block;
  }

  @media (${theme.media.md}) {
    padding: 40px;
    margin: 52px auto 0;
    background-color: ${theme.colors.white};

    & a {
      display: initial;
    }
  }
`;
