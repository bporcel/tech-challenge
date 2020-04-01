import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import EventRow from '../molecules/event-row.molecule';
import { Event } from '../../models/events.model';
import Literals from '../../models/literals.model';

const StyledCard = styled.div`
    background-color: ${Theme.colors.white};
    min-width: 60em;
`;

interface Props {
    events: Event[];
    literals: Literals;
    isButtonHovereable?: boolean;
    initialButtonText: string;
    handleClickButton: Function;
}

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
            <StyledCard className="bordered">{renderRows()}</StyledCard>
        </div>
    );
};

export default Card;
