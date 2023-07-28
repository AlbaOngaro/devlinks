import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  padding: 0;
  margin: 0 24px 24px;

  @media (${theme.media.md}) {
    margin: 0;
  }
`;

export const header = css`
  padding: 40px 40px 24px;
  width: 100%;
`;

export const form = css`
  padding: 0 40px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const label = (theme: Theme) => css`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${theme.colors.gray};
`;

export const item = (theme: Theme) => css`
  display: grid;
  grid-row-gap: 16px;
  align-items: center;
  background-color: ${theme.colors.lightGray};
  padding: 20px;
  border-radius: 12px;
  width: 100%;

  @media (${theme.media.md}) {
    grid-template-columns: 240px 1fr;
  }
`;

export const footer = (theme: Theme) => css`
  border-top: 1px solid ${theme.colors.borders};
  width: 100%;
  padding: 24px 40px;
  display: flex;
  flex-direction: row;
  margin-top: auto;

  & button {
    width: fit-content;
    margin-left: auto;
  }
`;
