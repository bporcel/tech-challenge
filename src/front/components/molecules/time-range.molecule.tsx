import React from 'react';
import Literals from '../../models/literals.model';
import TimeInput from '../atoms/time-input.atom';

interface Props {
    literals: Literals;
    setFilterValues: Function;
}

const TimeRange: React.FC<Props> = ({ literals, setFilterValues }) => {
    return (
        <div className="d-flex flex-row">
            <div>
                <TimeInput
                    id="from"
                    label={literals.from}
                    setForm={setFilterValues}
                />
            </div>
            <div className="pl-1">
                <TimeInput
                    id="to"
                    label={literals.to}
                    setForm={setFilterValues}
                />
            </div>
        </div>
    );
};

export default TimeRange;
