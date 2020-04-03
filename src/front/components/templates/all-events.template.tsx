import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Literals from '../../models/literals.model';
import Events, { Event } from '../../models/events.model';
import Cities from '../../models/cities.model';
import Card from '../organisms/card.organism';
import Modal from '../molecules/modal.molecule';
import Filter from '../organisms/filter.organism';
import NoContent from '../pages/no-content.page';
import PageNumbers from '../atoms/page-numbers.atom';

const StyledError = styled.div`
    color: ${Theme.colors.red};
    font-size: ${Theme.font.size.body1};
    width: 45%;
    margin: 1em auto;
    padding-left: 1em;
`;

const StyledRenderEvents = styled.div`
    width: 45%;
    margin: auto;
`;

const StyledPageNumbers = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2em;
`;

interface Props {
    events: Events[];
    allEvents: Events[];
    cities: Cities[];
    currentPage: number;
    literals: Literals;
    setCurrentPage: Function;
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
    currentPage,
    setCurrentPage,
}) => {
    const RESULTS_NUM = 5 > events.length ? events.length : 5;
    const TOTAL_PAGES = events.length / RESULTS_NUM;
    const [toogleModal, setToogleModal] = useState<boolean>(false);
    const [currentModalEvent, setCurrentModalEvent] = useState<Event>();
    const [buttonToChange, setButtonToChange] = useState<string[]>([]);

    const renderEvents = (): JSX.Element[] => {
        const pageEvents: JSX.Element[] = [];
        for (
            let i = RESULTS_NUM * (currentPage - 1);
            i < RESULTS_NUM * currentPage;
            i++
        ) {
            if (i < events.length) {
                pageEvents.push(
                    <StyledRenderEvents key={i}>
                        <p className="pl-1">{events[i].startDate}</p>
                        <Card
                            events={events[i].events}
                            literals={cardLiterals}
                            handleClickButton={handleClickSignUp}
                            initialButtonText={literals.signUp}
                            {...{ buttonToChange }}
                        />
                    </StyledRenderEvents>
                );
            }
        }
        return pageEvents;
    };

    useEffect(() => {
        const aux: string[] = [];
        Object.keys(sessionStorage).forEach(key => {
            aux.push(key);
        });

        setButtonToChange(aux);
    }, []);

    const handleClickSignUp = (event: Event): void => {
        const found = events.find(({ events }) =>
            events.find(({ id }) => event.id === id)
        );
        setCurrentModalEvent({
            ...event,
            date: found.startDate,
        });
        handleClickToogleModal();
    };

    const handleClickToogleModal = (): void => {
        setToogleModal(!toogleModal);
    };

    const changeButton = ({ id }): void => {
        const aux: string[] = buttonToChange;
        aux.push(id);
        setButtonToChange(aux);
    };

    const modalLiterals = {
        modalSignUp: literals.modalSignUp,
        cancel: literals.cancel,
        join: literals.join,
        joinTheEvent: literals.joinTheEvent,
        x: literals.x,
    };

    const cardLiterals = {
        signUp: literals.signUp,
        youreIn: literals.youreIn,
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
        <>
            <div className="w-100">
                {0 < allEvents.length ? (
                    <>
                        <Filter
                            literals={filterLiterals}
                            {...{ allEvents }}
                            {...{ cities }}
                            {...{ handleFilterEvents }}
                        />
                        {0 >= events.length && (
                            <StyledError>{literals.noFilterEvents}</StyledError>
                        )}
                        {renderEvents()}
                    </>
                ) : (
                    <NoContent />
                )}
                {1 < TOTAL_PAGES && (
                    <PageNumbers
                        {...{ currentPage }}
                        {...{ setCurrentPage }}
                        totalPages={TOTAL_PAGES}
                    />
                )}
            </div>
            {toogleModal && (
                <Modal
                    event={currentModalEvent}
                    literals={modalLiterals}
                    {...{ handleClickToogleModal }}
                    {...{ handleClickSignUp }}
                    {...{ handleClickJoin }}
                    {...{ changeButton }}
                />
            )}
        </>
    );
};

export default AllEventsTemplate;
