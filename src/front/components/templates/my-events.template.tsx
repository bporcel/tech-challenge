import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Card from '../organisms/card.organism';
import Events from '../../models/events.model';
import Literals from '../../models/literals.model';
import NoContent from '../pages/no-content.page';

interface Props {
    events: Events[];
    literals: Literals;
    handleClickCancelEvent: Function;
}

const MyEventsTemplate: React.FC<Props> = ({
    events,
    literals,
    handleClickCancelEvent,
}) => {
    const cardLiterals = {
        youreIn: literals.youreIn,
        cancel: literals.cancel,
        free: literals.free,
    };

    const renderEvents = (): JSX.Element[] =>
        events.map((event: any, index: number) => (
            <div key={index}>
                <p className="pl-1">{event.startDate}</p>
                <Card
                    events={event.events}
                    literals={cardLiterals}
                    isButtonHovereable
                    initialButtonText={literals.youreIn}
                    handleClickButton={handleClickCancelEvent}
                />
            </div>
        ));

    return (
        <div>
            {events.length > 0 ? (
                <h1 className="title">{literals.myNextEvents}</h1>
            ) : (
                <NoContent />
            )}

            <div>{renderEvents()}</div>
        </div>
    );
};

export default MyEventsTemplate;
