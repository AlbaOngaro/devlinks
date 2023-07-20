import { Theme, css } from "@emotion/react";

export const card = (theme: Theme) => css`
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  background-color: ${theme.colors.white};
  border-radius: 12px;
`;
