import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';

const StyledInput = styled.input`
    padding: 0.5em;
    margin-top: 1em;

    &:hover {
        cursor: text;
    }

    &:focus {
        outline-color: ${Theme.colors.blue};
    }

    &:before {
        content: ${({ label }): string => `'${label}'`};
        margin-right: 0.5em;
        color: ${Theme.colors.gray};
    }
`;

interface Props {
    id: string;
    label: string;
    value: string;
    handleChange: Function;
}

const TimeInput: React.FC<Props> = ({ id, label, value, handleChange }) => {
    const handleChangeMiddleman = ({ target }): void => {
        handleChange(target);
    };

    return (
        <StyledInput
            {...{ label }}
            {...{ id }}
            {...{ value }}
            type="time"
            onChange={handleChangeMiddleman}
        />
    );
};

export default TimeInput;
