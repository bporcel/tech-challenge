import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import IdName from '../../models/id-name.model';

const StyledInput = styled.input`
    padding: 0.5em;
    height: 1.5em;
    margin-top: 1em;
    &:focus {
        outline-color: ${Theme.colors.blue};
    }
    &::placeholder,
    ::-webkit-input-placeholder {
        font-size: ${Theme.font.size.body1};
        letter-spacing: 1px;
        color: ${Theme.colors.gray};
    }
`;

interface Props {
    id: string;
    inputId: string;
    value: string;
    options: IdName[];
    label: string;
    handleChange: Function;
}

const Select: React.FC<Props> = ({
    id,
    inputId,
    value,
    options,
    label,
    handleChange,
}) => {
    const renderOptions = () => {
        const listOptions: IdName[] = [];

        options.forEach((option: IdName) => {
            const found = listOptions.find(opt => opt.name === option.name);
            if (!found) {
                listOptions.push(option);
            }
        });

        return listOptions.map((option: IdName, index: number) => (
            <option key={index} value={option.name} />
        ));
    };

    const handleChangeMiddleman = ({ target }) => {
        handleChange(target);
    };

    return (
        <>
            <StyledInput
                placeholder={label}
                id={inputId}
                value={value || ''}
                list={id}
                onChange={handleChangeMiddleman}
            />
            <datalist {...{ id }}>{renderOptions()}</datalist>
        </>
    );
};

export default Select;
