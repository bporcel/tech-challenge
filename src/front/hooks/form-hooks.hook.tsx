import { useState } from 'react';

const useFormState: Function = initialValues => {
    const [fields, setFields] = useState(initialValues);

    const handleChange = (target): void => {
        const { id, value, checked, type } = target;
        if ('reset' === id) {
            let auxFields;
            Object.keys(fields).forEach(key => {
                auxFields = {
                    ...auxFields,
                    [key]: '',
                };
            });
            setFields(auxFields);
        } else {
            if ('checkbox' === type) {
                setFields({
                    ...fields,
                    [id]: checked,
                });
            } else {
                setFields({
                    ...fields,
                    [id]: value,
                });
            }
        }
    };

    return [fields, handleChange];
};

export default useFormState;
