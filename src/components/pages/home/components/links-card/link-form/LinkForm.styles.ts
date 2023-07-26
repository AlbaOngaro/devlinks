import { css, Theme } from "@emotion/react";

import { item as itemBase } from "../LinksCard.styles";

export const item = (theme: Theme) => css`
  ${itemBase(theme, false)};
  width: 100%;
  gap: 16px;
`;

export const header = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;

  & h6 {
    margin: 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    color: ${theme.colors.gray};
  }

  & button:nth-of-type(2) {
    margin-left: auto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: ${theme.colors.gray};
    cursor: pointer;
  }
`;

export const dragBtn = css`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: initial;
  cursor: grab;
`;

export const form = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
