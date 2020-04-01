import React from 'react';
import IdName from '../../models/id-name.model';

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
        <div className="input-form">
            <label htmlFor={inputId}>{label}</label>
            <input
                id={inputId}
                {...{ value }}
                list={id}
                onChange={handleChangeMiddleman}
            />
            <datalist {...{ id }}>{renderOptions()}</datalist>
        </div>
    );
};

export default Select;
