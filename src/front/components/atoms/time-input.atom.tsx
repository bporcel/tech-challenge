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
        outline: ${Theme.colors.blue};
    }

    &:before {
        content: ${({ label }) => `'${label}'`};
        margin-right: 0.6em;
        color: #9d9d9d;
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
