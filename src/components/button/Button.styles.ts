import { css, Theme } from "@emotion/react";

export const button = (theme: Theme, variant: "primary" | "secondary") => [
  css`
    appearance: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 11px 27px;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    width: 100%;

    & svg {
      width: 16px;
      height: 16px;
    }
  `,
  variant === "primary" &&
    css`
      background: ${theme.colors.purple};
      color: ${theme.colors.white};

      &:is(:hover, :active, :focus):not(:disabled) {
        background: ${theme.colors.purpleHoverColor};
        box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
      }

      &:disabled {
        opacity: 0.25;
        cursor: not-allowed;
      }
    `,
  variant === "secondary" &&
    css`
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.purple};
      color: ${theme.colors.purple};

      &:is(:hover, :active, :focus):not(:disabled) {
        background: ${theme.colors.purpleHoverColor};
      }

      &:disabled {
        opacity: 0.25;
        cursor: not-allowed;
      }
    `,
];
