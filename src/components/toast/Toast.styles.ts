import { css, keyframes, Theme } from "@emotion/react";

const slideUp = keyframes`
  from {
    bottom: -100%;
  }

  to {
    bottom: 0;
  }
`;

export const root = (theme: Theme) => css`
  background-color: ${theme.colors.darkGray};
  display: flex;
  padding: 16px 24px;
  align-items: center;
  gap: 8px;
  width: fit-content;
  border-radius: 12px;
  box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.1);
  animation: ${slideUp} 0.5s ease-in-out forwards;
`;

export const title = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  color: ${theme.colors.lightGray};
`;

export const viewport = css`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 10px;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
  pointer-events: none;
`;
