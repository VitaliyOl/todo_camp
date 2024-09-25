import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const inputStyles = css`
  margin-bottom: ${THEME.spacing.sm};
`;

export const errorStyles = css`
  color: ${THEME.colors.fuchsia};
  font-size: ${THEME.fontSizes.small};
  margin-top: ${THEME.spacing.xs};
`;