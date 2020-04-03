import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/theme';

const StyledButton = styled.button`
    background-color: ${Theme.colors.blue};
    border: solid 2px ${Theme.colors.blue};
    padding: 0.5em 1em;
    font-weight: bold;
    min-width: 7em;
    color: ${Theme.colors.white};

    &:focus {
        outline: none;
    }

    &:hover {
        color: ${Theme.colors.white};
        background-color: ${Theme.colors.blue};
    }

    ${({ page }): void =>
        page &&
        css`
            width: 1em;
            color: ${Theme.colors.blue};
            background-color: ${Theme.colors.white};
            margin: 0 0.5em;
        `}
`;

interface Props {
    text: string;
    id?: string;
    page?: boolean;
    handleClick?: Function;
}

const Button: React.FC<Props> = ({ id, page, text, handleClick }) => {
    return (
        <StyledButton {...{ id }} {...{ page }} onClick={handleClick}>
            {text}
        </StyledButton>
    );
};

export default Button;
