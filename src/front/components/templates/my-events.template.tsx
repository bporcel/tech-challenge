import React from 'react';
import styled from 'styled-components';
import Card from '../organisms/card.organism';
import Events from '../../models/events.model';
import Literals from '../../models/literals.model';
import NoContent from '../pages/no-content.page';
import PageNumbers from '../atoms/page-numbers.atom';

const StyledDiv = styled.div`
    width: 45%;
    margin: auto;
`;

interface Props {
    events: Events[];
    literals: Literals;
    currentPage: number;
    handleClickCancelEvent: Function;
    setCurrentPage: Function;
}

const MyEventsTemplate: React.FC<Props> = ({
    events,
    currentPage,
    literals,
    handleClickCancelEvent,
    setCurrentPage,
}) => {
    const cardLiterals = {
        youreIn: literals.youreIn,
        cancel: literals.cancel,
        free: literals.free,
    };

    const RESULTS_NUM = 5 > events.length ? events.length : 5;
    const TOTAL_PAGES = Math.ceil(events.length / RESULTS_NUM);

    const renderEvents = (): JSX.Element[] => {
        const pageEvents: JSX.Element[] = [];
        for (
            let i = RESULTS_NUM * (currentPage - 1);
            i < RESULTS_NUM * currentPage;
            i++
        ) {
            if (i < events.length) {
                pageEvents.push(
                    <StyledDiv key={i}>
                        <p className="pl-1">{events[i].startDate}</p>
                        <Card
                            events={events[i].events}
                            literals={cardLiterals}
                            initialButtonText={literals.youreIn}
                            isButtonHovereable
                            handleClickButton={handleClickCancelEvent}
                        />
                    </StyledDiv>
                );
            }
        }
        return pageEvents;
    };

    return (
        <div className="w-100">
            {0 < events.length ? (
                <StyledDiv>
                    <h1 className="title">{literals.myNextEvents}</h1>
                </StyledDiv>
            ) : (
                <NoContent />
            )}

            {renderEvents()}
            {1 < TOTAL_PAGES && (
                <PageNumbers
                    {...{ currentPage }}
                    {...{ setCurrentPage }}
                    totalPages={TOTAL_PAGES}
                />
            )}
        </div>
    );
};

export default MyEventsTemplate;
