import styled from 'styled-components';
import { blockSizes } from './common_system';
import { CommonStyledProps, Sizes } from './types';
import { createDisabledTextStyles, focusOutline } from './common_index'; // '.'

type MenuListItemProps = {
    disabled?: boolean;
    square?: boolean;
    primary?: boolean;
    size?: Sizes;
} & React.HTMLAttributes<HTMLLIElement> & CommonStyledProps;

export const StyledMenuListItem = styled.li<{ $disabled?: boolean; square?: boolean; primary?: boolean; size: Sizes;}>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: relative;
    height: ${props => blockSizes[props.size]};
    width: ${props => (props.square ? blockSizes[props.size] : 'auto')};
    padding: 0 8px;
    font-size: 1rem;
    white-space: nowrap;
    justify-content: ${props => props.square ? 'space-around' : 'space-between'};
    text-align: center;
    line-height: ${props => blockSizes[props.size]};
    color: ${({ theme }) => theme.materialText};
    pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'auto')};
    font-weight: ${({ primary }) => (primary ? 'bold' : 'normal')};
    &:hover {
        ${({ theme, $disabled }) => !$disabled &&
            `
                color: ${theme.materialTextInvert};
                background: ${theme.hoverBackground};
            `
         }
      cursor: default;
    }
    ${props => props.$disabled && createDisabledTextStyles()}
`;
