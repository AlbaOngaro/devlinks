import { Theme, css } from "@emotion/react";

export const header = css`
  grid-column: 1 / -1;
  background: white;
  padding: 16px 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const tabButtons = css`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

export const tabButton = (theme: Theme, isActive: boolean) => [
  css`
    display: flex;
    padding: 11px 27px;
    align-items: center;
    gap: 8px;
    border-radius: 8px;
    font-family: Instrument Sans;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: ${theme.colors.purple};
    }
  `,
  isActive &&
    css`
      background-color: ${theme.colors.lightPurple};
      color: ${theme.colors.purple};
    `,
  !isActive &&
    css`
      color: ${theme.colors.gray};
    `,
];

export const preview = css`
  width: fit-content;
`;
