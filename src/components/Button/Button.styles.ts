import { Theme, css } from "@emotion/react";

export const button = (theme: Theme, variant: "primary" | "secondary") => [
  css`
    appearance: none;
    display: flex;
    padding: 11px 27px;
    flex-direction: column;
    justify-content: center;
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
  `,
  variant === "primary" &&
    css`
      background: ${theme.colors.purple};
      color: ${theme.colors.white};

      &:is(:hover, :active, :focus) {
        background: ${theme.colors.purpleHoverColor};
        box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
      }

      &:disabled {
        opacity: 0.25;
      }
    `,
  variant === "secondary" &&
    css`
      background: ${theme.colors.white};
      border: 1px solid ${theme.colors.purple};
      color: ${theme.colors.purple};

      &:is(:hover, :active, :focus) {
        background: ${theme.colors.purpleHoverColor};
      }

      &:disabled {
        opacity: 0.25;
      }
    `,
];