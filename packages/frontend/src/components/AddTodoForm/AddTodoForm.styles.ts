import { css } from '@emotion/css';
import { THEME } from '../../shared/styles/theme';

export const formStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: ${THEME.spacing.lg};
  padding: ${THEME.spacing.md};
  background-color: ${THEME.colors.surface};
  border: 1px solid ${THEME.colors.primaryLight};
  border-radius: ${THEME.borderRadius.small};
  font-family: ${THEME.fonts.primary};

  input {
    margin-bottom: ${THEME.spacing.sm};
    padding: ${THEME.spacing.sm};
    border: 1px solid ${THEME.colors.primaryLight};
    border-radius: ${THEME.borderRadius.small};
    font-family: ${THEME.fonts.primary};
    width: 100%;
  }

  @media (${THEME.breakpoints.tablet}) {
    padding: ${THEME.spacing.lg};
  }

  button {
    padding: ${THEME.spacing.sm};
    background-color: ${THEME.colors.primary};
    color: ${THEME.colors.onPrimary};
    border: none;
    border-radius: ${THEME.borderRadius.small};
    cursor: pointer;
    font-family: ${THEME.fonts.bold};
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: ${THEME.colors.primaryDark};
    }
  }
`;