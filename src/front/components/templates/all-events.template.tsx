import React, { useState } from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Literals from '../../models/literals.model';
import Events, { Event } from '../../models/events.model';
import Cities from '../../models/cities.model';
import Card from '../organisms/card.organism';
import Modal from '../molecules/modal.molecule';
import Filter from '../organisms/filter.organism';
import NoContent from '../pages/no-content.page';

const StyledError = styled.span`
    color: ${Theme.colors.red};
    font-size: ${Theme.font.size.body2};
`;

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
            {allEvents.length > 0 ? (
                <>
                    <div className={`${toogleModal ? 'modal-blur' : ''}`}>
                        <h1 className="title">{literals.availableEvents}</h1>
                        <Filter
                            literals={filterLiterals}
                            {...{ allEvents }}
                            {...{ cities }}
                            {...{ handleFilterEvents }}
                        />
                        {events.length <= 0 && (
                            <StyledError>{literals.noFilterEvents}</StyledError>
                        )}
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
                </>
            ) : (
                <NoContent />
            )}
        </div>
    );
};

export default AllEventsTemplate;
