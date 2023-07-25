import { css, Theme } from "@emotion/react";

import { label as labelBase } from "components/input/Input.styles";

export const container = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const label = labelBase;

export const trigger = (theme: Theme) => css`
  width: 100%;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid ${theme.colors.borders};
  background: ${theme.colors.white};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  transition: all 0.3s ease-in-out;

  &:focus,
  &:active,
  &:hover {
    border-radius: 8px;
    border: 1px solid var(--purple, #633cff);
    background: var(--white, #fff);
    box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
    outline: none;
    cursor: pointer;
  }
`;

export const icon = (theme: Theme, isPrimary: boolean) => [
  css`
    display: flex;
    align-items: center;
    width: 16px;
    height: 16px;
    flex-shrink: 0;

    & svg {
      width: 100%;
      height: 100%;
    }
  `,
  isPrimary &&
    css`
      width: 24px;
      height: 24px;
      color: ${theme.colors.purple};
      margin-left: auto;
    `,
];

export const content = css`
  display: flex;
  padding: 12px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  border-radius: 8px;
  border: 1px solid var(--borders, #d9d9d9);
  background: var(--white, #fff);
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
  width: var(--radix-select-trigger-width);
  max-height: var(--radix-select-content-available-height);
`;

export const viewport = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const item = (theme: Theme) => css`
  width: 100%;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${theme.colors.darkGray};
  cursor: pointer;

  &[data-highlighted] {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    color: ${theme.colors.purple};
    outline: none;
  }
`;

export const separator = (theme: Theme) => css`
  height: 1px;
  align-self: stretch;
  background: ${theme.colors.borders};
`;
