import { css } from "@emotion/react";

export const card = css`
  justify-content: center;
`;

export const phone = css`
  padding: 52px 24px 24px;
  background-image: url(/images/illustration-phone-mockup.svg);
  margin: auto;
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-row-gap: 24px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: min(100%, 307px);
  height: min(100%, 631px);
`;
