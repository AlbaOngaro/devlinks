import { Theme, css } from "@emotion/react";

export const container = css`
  padding: 0;
`;
export const header = css`
  padding: 40px;
  width: 100%;

  & button {
    width: 100%;
    margin: 40px 0 0;
  }
`;
export const content = (theme: Theme) => css`
  width: calc(100% - 80px);
  padding: 20px;
  height: 100%;
  margin: 0 40px 40px;
  background: ${theme.colors.lightGray};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & * {
    text-align: center;
    width: min(100%, 488px);
  }

  & img {
    width: min(100%, 200px);
    height: 100%;
  }
`;
export const image = css`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const footer = (theme: Theme) => css`
  border-top: 1px solid ${theme.colors.borders};
  width: 100%;
  padding: 24px 40px;
  display: flex;
  flex-direction: row;
  margin-top: auto;

  & button {
    width: fit-content;
    margin-left: auto;
  }
`;
