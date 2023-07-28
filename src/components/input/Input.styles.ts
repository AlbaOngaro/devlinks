import { css, Theme } from "@emotion/react";

export const field = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
`;

export const label = (theme: Theme) => css`
  color: ${theme.colors.darkGray};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &[data-invalid] {
    color: ${theme.colors.red};
  }
`;

export const icon = css`
  position: absolute;
  bottom: 11px;
  left: 16px;
`;

export const input = (theme: Theme, hasIcon: boolean) => css`
  display: flex;
  padding: ${hasIcon ? "12px 16px 12px 44px" : "12px 16px"};
  align-items: center;
  gap: 12px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${theme.colors.borders};
  background: ${theme.colors.white};
  transition: all 0.3s ease-in-out;

  &:placholder {
    opacity: 0.8;
  }

  &:is(:hover, :active, :focus):not([data-invalid]) {
    border: 1px solid ${theme.colors.purple};
    box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
  }

  &[data-invalid] {
    color: ${theme.colors.red};
    border-radius: 8px;
    border: 1px solid var(--red, #ff3939);
    background: var(--white, #fff);
  }
`;

export const message = (theme: Theme) => css`
  position: absolute;
  right: 16px;
  bottom: 14px;
  color: ${theme.colors.red};
  text-align: right;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
`;
