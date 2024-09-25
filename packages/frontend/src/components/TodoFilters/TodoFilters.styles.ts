import { css } from '@emotion/css';
import { THEME } from '~/shared/styles/theme';

export const filterContainerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${THEME.colors.bgcolfilter};
  border-radius: ${THEME.borderRadius.medium};

  @media (${THEME.breakpoints.tablet}) {
    flex-direction: row;
    gap: ${THEME.spacing.sm};
    justify-content: space-around;
  }

  @media (${THEME.breakpoints.mobile}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const buttonGroupStyles = css`
  display: flex;
  gap: 8px;

  @media (${THEME.breakpoints.mobile}) {
    gap: 4px;
    padding: 4px;
    justify-content: center;

    button {
      padding: 8px 12px;
      font-weight: 600;
      margin: 0;
    }
  }
`;

export const searchInputStyles = css`
  flex-grow: 1;
  max-width: 300px;
  padding: 8px 16px;
  border: 1px solid ${THEME.colors.black};
  border-radius: ${THEME.borderRadius.medium};
  outline: none;

  &:focus {
    border-color: ${THEME.colors.primary};
  }

  @media (${THEME.breakpoints.mobile}) {
    width: 100%;
  }
`;