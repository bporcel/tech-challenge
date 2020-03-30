import React from 'react';
import Literals from '../../models/literals.model'

interface Props {
    time: string;
    title: string;
    isFree: boolean;
    location: string | number;
    literals: Literals;
};

const Event: React.FC<Props> = ({
    time,
    title,
    isFree,
    location,
    literals,
}) => {
    return (
        <div className="d-flex flex-row">
            <div className="pd-1">{time}</div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <div className="pd-1">{title}</div>
                    <div className="pd-1">
                        {isFree ? `${literals.free}` : ''}
                    </div>
                </div>
                <div className="pl-1">{location}</div>
            </div>
        </div>
    );
};

export default Event;
