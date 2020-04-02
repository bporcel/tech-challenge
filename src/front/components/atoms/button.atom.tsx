import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/theme';
import Literals from '../../models/literals.model';

const StyledButton = styled.button`
    background-color: ${Theme.colors.white};
    border: solid 2px;
    padding: 0.5em 1em;
    font-weight: bold;
    border-radius: 0.1em;
    min-width: 7em;

    &:focus {
        outline: none;
    }

    ${({ large }) =>
        large &&
        css`
            font-size: 18px;
        `}

    ${({ type }) =>
        (type === 'primary' &&
            css`
                color: ${Theme.colors.blue};
                border-color: ${Theme.colors.blue};
                &:hover {
                    color: ${Theme.colors.white};
                    background-color: ${Theme.colors.blue};
                    cursor: pointer;
                }
            `) ||
        (type === 'secondary' &&
            css`
                color: ${Theme.colors.green};
                border-color: ${Theme.colors.green};
                &:hover {
                    color: ${Theme.colors.white};
                    background-color: ${Theme.colors.green};
                    cursor: pointer;
                }
            `) ||
        (type === 'close' &&
            css`
                color: ${Theme.colors.gray};
                border: none;
                background-color: ${Theme.colors.lightGray};
                font-size: 1.5em;
                padding: 0.3em 0.5em 0 0;
                min-width: auto;
            `) ||
        (type === 'warning' &&
            css`
                color: ${Theme.colors.orange};
                border-color: ${Theme.colors.orange};
                &:hover {
                    color: ${Theme.colors.white};
                    background-color: ${Theme.colors.orange};
                    cursor: pointer;
                }
            `)}
`;

interface Props {
    type: 'primary' | 'secondary' | 'close' | 'warning' | string;
    initialText: string;
    id?: string;
    isHovereable?: boolean;
    large?: boolean;
    literals?: Literals;
    handleClick: Function;
}

const Button: React.FC<Props> = ({
    type,
    handleClick,
    id,
    large,
    literals,
    isHovereable,
    initialText,
}) => {
    const [text, setText] = useState(initialText);
    const [disabled, setDisabled] = useState(false);
    
    const handleClickMiddleman = ({ target }) => {
        const shouldTextChange = handleClick(target);
        if (shouldTextChange) {
            setText(literals.youreIn);
            setDisabled(shouldTextChange);
        }
    };

    const handleHover = (): void => {
        if (isHovereable) {
            if (text === literals.cancel) {
                setText(literals.youreIn);
            } else {
                setText(literals.cancel);
            }
        }
    };

    return (
        <StyledButton
            {...{ id }}
            {...{ type }}
            {...{ large }}
            {...{ disabled }}
            onClick={handleClickMiddleman}
            onMouseOver={handleHover}
            onMouseOut={handleHover}
        >
            {text}
        </StyledButton>
    );
};

export default Button;
