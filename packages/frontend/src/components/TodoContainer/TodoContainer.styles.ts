import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const containerStyles = css`
  width: 100%;
  padding: ${THEME.spacing.lg};
  box-sizing: border-box;
  font-family: ${THEME.fonts.primary};

  @media (${THEME.breakpoints.desktop}) {
    display: table;
    width: 100%;
    table-layout: fixed;
  }

  @media (${THEME.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: ${THEME.spacing.md};
    overflow-x: hidden;
  }

  @media (${THEME.breakpoints.mobile}) {
    display: block;
  }
`;

