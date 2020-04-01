import React from 'react';
import Literals from '../../models/literals.model';
import TimeInput from '../atoms/time-input.atom';

interface Props {
    literals: Literals;
    values: any;
    handleChange: any;
}

const TimeRange: React.FC<Props> = ({ literals, values, handleChange }) => {
    return (
        <div className="d-flex flex-row">
            <div>
                <TimeInput
                    id="from"
                    value={values['from']}
                    label={literals.from}
                    {...{ handleChange }}
                />
            </div>
            <div className="pl-1">
                <TimeInput
                    id="to"
                    value={values['to']}
                    label={literals.to}
                    {...{ handleChange }}
                />
            </div>
        </div>
    );
};

export default TimeRange;
