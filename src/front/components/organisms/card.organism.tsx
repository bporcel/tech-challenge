import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import EventRow from '../molecules/event-row.molecule';
import { Event } from '../../models/events.model';
import Literals from '../../models/literals.model';

const StyledCard = styled.div`
    background-color: ${Theme.colors.white};
`;

interface Props {
    events: Event[];
    literals: Literals;
    isButtonHovereable?: boolean;
    buttonToChange?: string[];
    initialButtonText: string;
    handleClickButton: Function;
}

const Card: React.FC<Props> = ({
    events,
    literals,
    buttonToChange,
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
                    literals={EventRowLiterals}
                    {...{ event }}
                    {...{ isButtonHovereable }}
                    {...{ initialButtonText }}
                    {...{ handleClickButton }}
                    {...{buttonToChange}}
                />
                {index < events.length - 1 && <hr className="separator" />}
            </div>
        ));

    return <StyledCard className="bordered">{renderRows()}</StyledCard>;
};

export default Card;
