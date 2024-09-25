import { css } from '@emotion/css';
import { THEME } from '~shared/styles/theme';

export const sliderContainer = css`
  .slick-list {
    overflow: hidden;
    padding: 0 ${THEME.spacing.sm};
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100% !important;
    padding: ${THEME.spacing.sm};
  }

  .slick-dots {
    display: none !important;
  }

  .slick-prev, .slick-next {
    display: none !important;
  }
`;


export const gridContainer = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${THEME.spacing.md};
  padding: ${THEME.spacing.md};

  @media (${THEME.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }

  @media (${THEME.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;