import { css } from '@emotion/css';
import { THEME } from '../../shared/styles/theme';

export const elementStyles = css`
  padding: ${THEME.spacing.md};
  border: 1px solid ${THEME.colors.primaryLight};
  background-color: ${THEME.colors.surface};
  border-radius: ${THEME.borderRadius.small};
  margin-bottom: ${THEME.spacing.sm};
  font-family: ${THEME.fonts.primary};
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    margin: 0 0 ${THEME.spacing.xs} 0;
    font-family: ${THEME.fonts.bold};
    color: ${THEME.colors.primaryDark};
  }

  p {
    font-family: ${THEME.fonts.primary};
    color: ${THEME.colors.onSurface};
  }
`;

export const buttonGroupStyles = css`
  margin-top: ${THEME.spacing.md};
  display: flex;
  gap: ${THEME.spacing.xs};
`;