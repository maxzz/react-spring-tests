import { css } from 'styled-components';
import { Color, CommonThemeProps, Theme } from './types';

export const createDisabledTextStyles = () => css`
  -webkit-text-fill-color: ${({ theme }) => theme.materialTextDisabled};
  color: ${({ theme }) => theme.materialTextDisabled};
  text-shadow: 1px 1px ${({ theme }) => theme.materialTextDisabledShadow};
  /* filter: grayscale(100%); */
`;

export const focusOutline = () => css`
  outline: 2px dotted ${({ theme }) => theme.materialText};
`;
