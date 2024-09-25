import { css } from '@emotion/css';
import { THEME } from '~/shared/styles/theme';

export const homePageStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${THEME.colors.lotion};

  .app-name {
    font-size: ${THEME.fontSizes.xlarge};
    margin-bottom: ${THEME.spacing.xl};
    color: ${THEME.colors.maastrichtBlue};
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${THEME.spacing.md};

    .auth-link {
      text-decoration: none;
      width: 150px;
    }

    .auth-button {
      width: 100%;
      padding: ${THEME.spacing.md};
      background-color: ${THEME.colors.primary};
      color: ${THEME.colors.onPrimary};
      border: none;
      border-radius: ${THEME.borderRadius.medium};
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: ${THEME.colors.primaryLight};
      }
    }

    .forgot-password {
      margin-top: ${THEME.spacing.lg};
      color: ${THEME.colors.UCLABlue};
      text-decoration: none;
      font-size: ${THEME.fontSizes.medium};
    }

    .forgot-password:hover {
      text-decoration: underline;
    }
  }
  
  @media ${THEME.breakpoints.mobile} {
    .app-name {
      font-size: ${THEME.fontSizes.large};
    }

    .auth-link {
      width: 100%;
    }
  }
  
  @media ${THEME.breakpoints.tablet} {
    .app-name {
      font-size: ${THEME.fontSizes.xlarge};
    }

    .auth-link {
      width: 120px;
    }
  }
  
  @media ${THEME.breakpoints.desktop} {
    .app-name {
      font-size: ${THEME.fontSizes.xlarge};
    }

    .auth-link {
      width: 150px;
    }
  }
`;
