import React from 'react';

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
        <>
            <label htmlFor={id}>{label}</label>
            <input
                {...{ id }}
                type="checkbox"
                {...{checked}}
                onChange={handleChangeMiddleman}
            />
        </>
    );
};

export default CheckBox;
