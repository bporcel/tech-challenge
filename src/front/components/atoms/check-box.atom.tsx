import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/theme';

const StyledLabel = styled.label`
    color: ${Theme.colors.green};
    font-weight: bold;
    display: inline-block;
    vertical-align: middle;
    background-color: ${Theme.colors.white};
    padding: 0.7em;
    margin-top: 0.9em;
    &:hover {
        cursor: pointer;
    }
    ${props =>
        props.checked &&
        css`
            background-color: ${Theme.colors.green};
            color: ${Theme.colors.white};
        `}
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
    border: 0;
    clip: rect(0 0 0 0);
    clippath: inset(50%);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

interface Props {
    id: string;
    label: string;
    checked: boolean;
    handleChange: any;
}

const CheckBox: React.FC<Props> = ({ id, label, checked, handleChange }) => {
    const handleChangeMiddleman = ({ target }): void => {
        handleChange(target);
    };

    return (
        <StyledLabel htmlFor={id} {...{ checked }} className="bordered">
            {label}
            <HiddenCheckbox
                {...{ id }}
                type="checkbox"
                {...{ checked }}
                onChange={handleChangeMiddleman}
            />
        </StyledLabel>
    );
};

export default CheckBox;
