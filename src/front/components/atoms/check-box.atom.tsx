import React from 'react';

interface Props {
    id: string;
    label: string;
    setForm: Function;
}

const CheckBox: React.FC<Props> = ({ id, label, setForm }) => {
    const handleChange = ({ target }): void => {
        const { id, checked } = target;
        setForm(id, checked);
    };

    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input {...{ id }} type="checkbox" onChange={handleChange} />
        </>
    );
};

export default CheckBox;
