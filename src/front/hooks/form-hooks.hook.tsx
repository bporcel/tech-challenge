import { useState } from 'react';

const useFormState: Function = initialValues => {
    const [fields, setFields] = useState(initialValues);

    const handleChange = target => {
        const { id, value, checked } = target;
        if (id === 'reset') {
            let auxFields;
            Object.keys(fields).forEach(key => {
                auxFields = {
                    ...auxFields,
                    [key]: '',
                };
            });
            setFields(auxFields);
        } else {
            setFields({
                ...fields,
                [id]: value && value !== 'on' ? value : checked,
            });
        }
    };

    return [fields, handleChange];
};

export default useFormState;
