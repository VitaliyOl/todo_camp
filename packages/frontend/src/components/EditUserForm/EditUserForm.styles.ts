import { css } from '@emotion/css';
import { THEME } from '~/shared/styles/theme';

export const formStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${THEME.spacing.lg};
  background-color: ${THEME.colors.surface};
  border: 1px solid ${THEME.colors.black};
  border-radius: ${THEME.borderRadius.medium};
  max-width: 400px;
  margin: 0 auto;

  .error-message {
    color: ${THEME.colors.error};
    margin-bottom: ${THEME.spacing.md};
  }
`;