import React, { useState } from 'react';
import Card from '../organisms/card.organism';
import Modal from '../molecules/modal.molecule';
import Literals from '../../models/literals.model';
import Events, { Event } from '../../models/events.model';

interface Props {
    events: Events[];
    literals: Literals;
    handleClickJoin: Function;
}

const AllEventsTemplate: React.FC<Props> = ({
    events,
    literals,
    handleClickJoin,
}) => {
    const [toogleModal, setToogleModal] = useState<boolean>(false);
    const [currentModalEvent, setCurrentModalEvent] = useState<Event>();

    const handleClickSignUp = (event: Event): void => {
        const found = events.find(({ events }) =>
            events.find(({ id }) => event.id === id)
        );
        setCurrentModalEvent({
            ...event,
            date: found.startDate,
        });
        setToogleModal(!toogleModal);
    };

    const handleClickToogleModal = (): void => {
        setToogleModal(!toogleModal);
    };

    const modalLiterals = {
        modalSignUp: literals.modalSignUp,
        cancel: literals.cancel,
        join: literals.join,
        x: literals.x,
    };

    const cardLiterals = {
        signUp: literals.signUp,
        free: literals.free,
    }

    const renderEvents = (): JSX.Element[] =>
        events.map((event: any, index: number) => (
            <div key={index}>
                <p className="pl-1">{event.startDate}</p>
                <Card
                    initialButtonText={literals.signUp}
                    events={event.events}
                    literals={cardLiterals}
                    handleClickButton={handleClickSignUp}
                />
            </div>
        ));

    return (
        <div>
            <div className={`${toogleModal ? 'modal-blur' : ''}`}>
                {renderEvents()}
            </div>
            {toogleModal && (
                <Modal
                    event={currentModalEvent}
                    {...{ handleClickToogleModal }}
                    {...{ handleClickSignUp }}
                    {...{ handleClickJoin }}
                    literals={modalLiterals}
                />
            )}
        </div>
    );
};

export default AllEventsTemplate;
