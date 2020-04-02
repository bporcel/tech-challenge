import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Button from '../atoms/button.atom';
import Literals from '../../models/literals.model';

const StyledNoContent = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const StyledTextBox = styled.div`
    background-color: ${Theme.colors.white};
    margin-bottom: 50px;
`;

interface Props {
    button: boolean;
    literals: Literals;
    handleClickGoToAllEvents: Function;
}

const NoContentTemplate: React.FC<Props> = ({
    literals,
    button,
    handleClickGoToAllEvents,
}) => {
    return (
        <StyledNoContent className="d-flex flex-column">
            <StyledTextBox className="bordered pd-1">
                <h1 className="title bold">
                    {button ? literals.myEventsEmpty : literals.noEvents}
                </h1>
            </StyledTextBox>
            {button && (
                <Button
                    large
                    type="primary"
                    initialText={literals.seeAllAvailableEvents}
                    handleClick={handleClickGoToAllEvents}
                />
            )}
        </StyledNoContent>
    );
};

export default NoContentTemplate;
