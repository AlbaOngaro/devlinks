import { css } from "@emotion/react";

export const container = css`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: 16px;
  width: 100vw;
  height: 100vh;
  padding: 32px;
`;
