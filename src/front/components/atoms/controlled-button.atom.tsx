import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/theme';

const StyledButton = styled.button`
    color: ${Theme.colors.white};
    background-color: ${Theme.colors.blue};
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
`;

interface Props {
    text: string;
    id?: string;
    large?: boolean;
}

const Button: React.FC<Props> = ({ id, large, text }) => {
    return (
        <StyledButton {...{ id }} {...{ large }}>
            {text}
        </StyledButton>
    );
};

export default Button;
