import { css } from "@emotion/react";

export const container = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

export const card = css`
  width: min(100%, 476px);
  height: fit-content;
  margin: 52px auto 0;
  gap: 40px;
`;
