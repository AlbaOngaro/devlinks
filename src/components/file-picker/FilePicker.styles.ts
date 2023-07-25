import { css, Theme } from "@emotion/react";

export const label = (theme: Theme) => css`
  display: grid;
  grid-template-columns: 193px 1fr;
  grid-column-gap: 24px;
  align-items: center;
  cursor: pointer;
  font-family: Instrument Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  color: ${theme.colors.gray};
`;

export const input = css`
  display: none;
`;

export const placeholder = (theme: Theme) => css`
  width: min(100%, 193px);
  aspect-ratio: 1/1;
  background-color: ${theme.colors.lightPurple};
  color: ${theme.colors.purple};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  text-align: center;
  border-radius: 12px;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;

  & svg {
    width: 40px;
    height: 40px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const picture = (theme: Theme) => css`
  width: min(100%, 193px);
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 12px;
  position: relative;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &::after {
    content: "Change Image";
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
    color: ${theme.colors.white};
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    text-align: center;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    &::after {
      opacity: 1;
    }
  }
`;
