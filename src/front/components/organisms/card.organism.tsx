import React from 'react';
import EventRow from '../molecules/event-row.molecule';
import { Event } from '../../models/events.model';
import Literals from '../../models/literals.model';

interface Props {
    events: Event[];
    literals: Literals;
    isButtonHovereable?: boolean;
    initialButtonText: string;
    handleClickButton: Function;
};

const Card: React.FC<Props> = ({
    events,
    literals,
    isButtonHovereable,
    initialButtonText,
    handleClickButton,
}) => {
    const EventRowLiterals = {
        ...literals,
    };

    const renderRows = (): JSX.Element[] =>
        events.map((event: Event, index: number) => (
            <div key={index}>
                <EventRow
                    {...{ event }}
                    literals={EventRowLiterals}
                    {...{ isButtonHovereable }}
                    {...{ initialButtonText }}
                    {...{ handleClickButton }}
                />
                {index < events.length - 1 ? (
                    <hr className="separator" />
                ) : null}
            </div>
        ));

    return (
        <div>
            <div className="bordered card">{renderRows()}</div>
        </div>
    );
};

export default Card;
