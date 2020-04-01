import React from 'react';

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
        <div className="input-form">
            <label htmlFor={id}>{label}</label>
            <input
                {...{ id }}
                {...{ value }}
                type="time"
                onChange={handleChangeMiddleman}
            />
        </div>
    );
};

export default TimeInput;
