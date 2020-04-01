import React from 'react';

interface Props {
    id: string;
    label: string;
    setForm: Function;
}

const TimeInput: React.FC<Props> = ({ id, label, setForm }) => {
    const handleChange = ({ target }): void => {
        const { id, value } = target;
        setForm(id, value);
    };

    return (
        <div className="input-form">
            <label htmlFor={id}>{label}</label>
            <input {...{ id }} type="time" onChange={handleChange} />
        </div>
    );
};

export default TimeInput;
