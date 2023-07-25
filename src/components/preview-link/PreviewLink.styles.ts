import { Theme, css } from "@emotion/react";

import { Platform } from "types";

export const link = (theme: Theme, type: Platform) => [
  css`
    width: 100%;
    padding: 12px 16px;
    display: grid;
    grid-template-columns: 20px 1fr 16px;
    grid-column-gap: 8px;
    align-items: center;
    border-radius: 8px;
    color: ${theme.colors.white};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;

    & img {
      filter: contrast(10) invert(1);
    }
  `,
  type === "github" &&
    css`
      background: #1a1a1a;
    `,
  type === "frontend-mentor" &&
    css`
      border: 1px solid ${theme.colors.borders};
      background: ${theme.colors.white};
      color: ${theme.colors.darkGray};

      & img {
        filter: contrast(10);
      }
    `,
  type === "twitter" &&
    css`
      background-color: #43b7e9;
    `,
  type === "linkedin" &&
    css`
      background-color: #2d68ff;
    `,
  type === "youtube" &&
    css`
      background-color: #ee3939;
    `,
  type === "facebook" &&
    css`
      background-color: #2442ac;
    `,
  type === "twitch" &&
    css`
      background-color: #ee3fc8;
    `,
  type === "devto" &&
    css`
      background-color: #333333;
    `,
  type === "codewars" &&
    css`
      background-color: #8a1a50;
    `,
  type === "codepen" &&
    css`
      background-color: #47cf73;
    `,
  type === "freecodecamp" &&
    css`
      background-color: #302267;
    `,
  type === "gitlab" &&
    css`
      background-color: #eb4925;
    `,
  type === "hashnode" &&
    css`
      background-color: #0330d1;
    `,
  type === "stack-overflow" &&
    css`
      background-color: #ec7100;
    `,
];
