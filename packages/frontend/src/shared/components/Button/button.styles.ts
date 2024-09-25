import { css } from '@emotion/css';
import { THEME } from '../../styles/theme';

export const btnStyles = (variant: 'primary' | 'secondary' | 'danger' | 'default', size: 'small' | 'medium' | 'large', disabled: boolean): string => {
  const backgroundColor = disabled 
    ? THEME.colors.disabled 
    : variant === 'default' 
    ? THEME.colors.default
    : THEME.colors[variant];
    
  const color = variant === 'secondary' ? THEME.colors.primaryDark : THEME.colors.white;

  return css`
    padding: ${size === 'small' ? '8px 16px' : size === 'large' ? '16px 32px' : '12px 24px'};
    font-size: ${size === 'small' ? '14px' : size === 'large' ? '18px' : '16px'};
    font-weight: 700;
    color: ${color};
    background-color: ${backgroundColor};
    border: none;
    border-radius: 28px;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    transition: background-color 0.3s ease, color 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: ${!disabled && variant === 'primary' ? THEME.colors.primaryLight : THEME.colors[variant]};
    }
  `;
};


export const btnContentWrapper = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;