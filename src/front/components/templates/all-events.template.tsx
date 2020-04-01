import React, { useState } from 'react';
import Literals from '../../models/literals.model';
import Events, { Event } from '../../models/events.model';
import Cities from '../../models/cities.model';
import Card from '../organisms/card.organism';
import Modal from '../molecules/modal.molecule';
import Filter from '../organisms/filter.organism';

interface Props {
    events: Events[];
    allEvents: Events[];
    cities: Cities[];
    literals: Literals;
    handleClickJoin: Function;
    handleFilterEvents: Function;
}

const AllEventsTemplate: React.FC<Props> = ({
    events,
    allEvents,
    cities,
    literals,
    handleClickJoin,
    handleFilterEvents,
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

    const modalLiterals = {
        modalSignUp: literals.modalSignUp,
        cancel: literals.cancel,
        join: literals.join,
        x: literals.x,
    };

    const cardLiterals = {
        signUp: literals.signUp,
        free: literals.free,
    };

    const filterLiterals = {
        reset: literals.reset,
        eventName: literals.eventName,
        city: literals.city,
        from: literals.from,
        to: literals.to,
        free: literals.free,
    };

    return (
        <div>
            <div className={`${toogleModal ? 'modal-blur' : ''}`}>
                <h1 className="title">
                    {events.length > 0
                        ? literals.availableEvents
                        : literals.noEvents}
                </h1>
                <Filter
                    literals={filterLiterals}
                    {...{ allEvents }}
                    {...{ cities }}
                    {...{ handleFilterEvents }}
                />
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
