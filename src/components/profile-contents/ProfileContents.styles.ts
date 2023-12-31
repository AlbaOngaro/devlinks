import { css, Theme } from "@emotion/react";

export const header = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const avatar = (theme: Theme) => css`
  width: 96px;
  height: 96px;
  border-radius: 100%;
  margin-bottom: 24px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid ${theme.colors.purple};

  &:not(:has(> img)) {
    border: none;
    background-color: ${theme.colors.borders};
  }

  &:has(> img) {
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }
`;

export const name = (theme: Theme) => css`
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin: 0 0 8px;

  &:empty {
    width: 8ch;
    height: 16px;
    border-radius: 104px;
    background: ${theme.colors.borders};
    margin: 0 0 12px;
  }
`;

export const email = (theme: Theme) => css`
  color: ${theme.colors.darkGray};

  &:empty {
    width: 6ch;
    height: 8px;
    border-radius: 104px;
    background: ${theme.colors.borders};
  }
`;

export const wrapper = css`
  height: 340px;
  width: 100%;
  overflow: scroll;
`;

export const links = css`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;
