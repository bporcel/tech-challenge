import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Event from '../atoms/event.atom';
import Button from '../atoms/button.atom';
import ControlledButton from '../atoms/controlled-button.atom';
import { Event as EventModel } from '../../models/events.model';
import Literals from '../../models/literals.model';

const StyledFree = styled.div`
    color: ${Theme.colors.green};
    font-weight: bold;
    margin-right: 1em;
`;

interface Props {
    event: EventModel;
    literals: Literals;
    isButtonHovereable: boolean;
    initialButtonText: string;
    buttonToChange?: string[];
    handleClickButton: Function;
}

const EventRow: React.FC<Props> = ({
    event,
    literals,
    handleClickButton,
    isButtonHovereable,
    buttonToChange,
    initialButtonText,
}) => {
    const buttonLiterals = {
        youreIn: literals.youreIn,
        cancel: literals.cancel,
    };

    const findId = (): boolean => {
        if (buttonToChange) {
            let found = false;
            buttonToChange.forEach(id => {
                if (id === `${event.id}`) {
                    found = true;
                }
            });
            return found;
        }
    };

    return (
        <div className="d-flex flex-row align-items-center justify-between pd-1">
            <div>
                <Event
                    from={event.from}
                    duration={event.duration}
                    title={event.name}
                    location={event.city}
                />
            </div>
            <div className="d-flex flex-row align-items-center">
                <StyledFree>
                    {event.isFree ? `${literals.free}` : ''}
                </StyledFree>
                {findId() ? (
                    <ControlledButton
                        id={`${event.id}`}
                        text={literals.youreIn}
                    />
                ) : (
                    <Button
                        id={`${event.id}`}
                        type="primary"
                        handleClick={(): void => handleClickButton(event)}
                        literals={buttonLiterals}
                        isHovereable={isButtonHovereable}
                        initialText={initialButtonText}
                    />
                )}
            </div>
        </div>
    );
};

export default EventRow;
