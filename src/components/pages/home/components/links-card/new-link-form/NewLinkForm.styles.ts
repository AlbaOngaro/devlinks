import { Theme, css } from "@emotion/react";

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
  justify-content: space-between;
  width: 100%;

  & h6 {
    margin: 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    color: ${theme.colors.gray};
  }

  & button {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: ${theme.colors.gray};
    cursor: pointer;
  }
`;

export const form = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
