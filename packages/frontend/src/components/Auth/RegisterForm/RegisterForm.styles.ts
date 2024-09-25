import { css } from '@emotion/css';
import { THEME } from '~/shared/styles/theme';

export const formStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${THEME.spacing.lg};
  background-color: ${THEME.colors.surface};

  h1 {
    margin-bottom: ${THEME.spacing.lg};
    color: ${THEME.colors.primary};
    font-family: ${THEME.fonts.primary};
  }
`;