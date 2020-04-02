import React from 'react';
import styled from 'styled-components';
import Card from '../organisms/card.organism';
import Events from '../../models/events.model';
import Literals from '../../models/literals.model';
import NoContent from '../pages/no-content.page';

const StyledDiv = styled.div`
    width: 45%;
    margin: auto;
`;

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
            <StyledDiv key={index}>
                <p className="pl-1">{event.startDate}</p>
                <Card
                    events={event.events}
                    literals={cardLiterals}
                    initialButtonText={literals.youreIn}
                    isButtonHovereable
                    handleClickButton={handleClickCancelEvent}
                />
            </StyledDiv>
        ));

    return (
        <div className="w-100">
            {events.length > 0 ? (
                <StyledDiv>
                    <h1 className="title">{literals.myNextEvents}</h1>
                </StyledDiv>
            ) : (
                <NoContent />
            )}

            {renderEvents()}
        </div>
    );
};

export default MyEventsTemplate;
