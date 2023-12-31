import { css, Theme } from "@emotion/react";

export const container = (theme: Theme) => css`
  padding: 0;
  margin: 0 24px 24px;

  @media (${theme.media.md}) {
    margin: 0;
  }
`;

export const header = css`
  padding: 40px 40px 24px;
  width: 100%;

  & button {
    width: 100%;
    margin: 40px 0 0;
  }
`;
export const content = (theme: Theme, isEmpty: boolean) => css`
  padding: 0 40px 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${isEmpty ? "center" : "flex-start"};
  align-items: center;
  width: 100%;
`;

export const item = (theme: Theme, fullHeight: boolean) => css`
  background-color: ${theme.colors.lightGray};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${fullHeight ? "100%" : "auto"};
  width: 100%;
`;

export const picture = css`
  position: relative;
  width: min(250px, 100%);
  height: 100%;
  aspect-ratio: 16/9;
`;

export const linksWrapper = css`
  height: 350px;
  width: 100%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 24px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const emptyTitle = css`
  margin: 24px 0;
  text-align: center;
`;

export const emptyBody = css`
  text-align: center;
  width: min(100%, 488px);
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
    @media (${theme.media.l}) {
      width: fit-content;
      margin-left: auto;
    }
  }
`;
