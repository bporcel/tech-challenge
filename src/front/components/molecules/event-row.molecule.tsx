import React from 'react';
import Event from '../atoms/event.atom';
import Button from '../atoms/button.atom';
import { Event as EventModel } from '../../models/events.model';
import Literals from '../../models/literals.model';

interface Props {
    event: EventModel;
    literals: Literals;
    isButtonHovereable: boolean;
    initialButtonText: string;
    handleClickButton: Function;
};

const EventRow: React.FC<Props> = ({
    event,
    literals,
    handleClickButton,
    isButtonHovereable,
    initialButtonText,
}) => {
    const eventLiterals = {
        free: literals.free,
    };

    const buttonLiterals = {
        youreIn: literals.youreIn,
        cancel: literals.cancel,
    };

    return (
        <div className="d-flex flex-row align-items-center justify-between">
            <Event
                time={event.time}
                title={event.name}
                isFree={event.isFree}
                location={event.city}
                literals={eventLiterals}
            />
            <Button
                id={`${event.id}`}
                type="primary"
                handleClick={() => handleClickButton(event)}
                literals={buttonLiterals}
                isHovereable={isButtonHovereable}
                initialText={initialButtonText}
            />
        </div>
    );
};

export default EventRow;
