import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  width: 100vw;
  min-height: 100vh;
  display: grid;
  grid-gap: 24px;

  @media (${theme.media.md}) {
    padding: 24px;
  }

  @media (${theme.media.l}) {
    grid-template-columns: 1fr 2fr;
    grid-template-rows: min-content 1fr;
  }
`;

export const logo = (theme: Theme) => css`
  position: relative;
  width: 32px;
  height: 32px;

  @media (${theme.media.md}) {
    height: 32px;
    width: 146px;
  }
`;

export const tabButtons = css`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const tabButton = (theme: Theme, isActive: boolean) => [
  css`
    display: flex;
    align-items: center;
    border-radius: 8px;
    font-size: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    padding: 11px 27px;

    & svg {
      width: 20px;
      height: 20px;
    }

    @media (${theme.media.md}) {
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;
      gap: 8px;
    }

    &:hover {
      color: ${theme.colors.purple};
    }
  `,
  isActive &&
    css`
      background-color: ${theme.colors.lightPurple};
      color: ${theme.colors.purple};
    `,
  !isActive &&
    css`
      color: ${theme.colors.gray};
    `,
];

export const preview = (theme: Theme) => css`
  font-size: 0;
  width: fit-content;
  padding: 11px 16px;
  gap: 0;

  @media (${theme.media.md}) {
    font-size: initial;
    padding: 11px 27px;

    & svg {
      display: none;
    }
  }
`;
