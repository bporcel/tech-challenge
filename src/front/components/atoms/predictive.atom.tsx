import React, { cloneElement } from 'react';
import IdName from '../../models/id-name.model';

interface Props {
    id: string;
    inputId: string;
    options: IdName[];
    label: string;
    setForm: Function;
}

const Select: React.FC<Props> = ({ id, inputId, options, label, setForm }) => {
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

    const handleChange = ({ target }) => {
        const { id, value } = target;
        setForm(id, value);
    };

    return (
        <div className="input-form">
            <label htmlFor={inputId}>{label}</label>
            <input id={inputId} list={id} onChange={handleChange} />
            <datalist {...{ id }}>{renderOptions()}</datalist>
        </div>
    );
};

export default Select;
