import { css } from '@emotion/css';
import { THEME } from '~/shared/styles/theme';

export const todosPageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${THEME.spacing.lg};
`;

export const buttonContainerStyles = css`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${THEME.spacing.md} 0;

  button {
    width: 150px;
  }
`;