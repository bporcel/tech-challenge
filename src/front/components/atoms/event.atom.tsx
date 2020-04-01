import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/theme';
import Literals from '../../models/literals.model';

const StyledDiv = styled.div`
    ${props =>
        (props.location &&
            css`
                font-size: ${Theme.font.size.body2};
                color: ${Theme.colors.darkGray};
            `) ||
        (props.free &&
            css`
                color: ${Theme.colors.green};
                font-weight: bold;
            `) ||
        (props.time &&
            css`
                font-size: ${Theme.font.size.bodyBig};
            `)}
`;

interface Props {
    time: string;
    title: string;
    isFree: boolean;
    location: string | number;
    literals: Literals;
}

const Event: React.FC<Props> = ({
    time,
    title,
    isFree,
    location,
    literals,
}) => {
    return (
        <div className="d-flex flex-row">
            <StyledDiv time className="pd-1">
                {time}
            </StyledDiv>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">
                    <div className="pd-1">{title}</div>
                    <StyledDiv free className="pd-1">
                        {isFree ? `${literals.free}` : ''}
                    </StyledDiv>
                </div>
                <StyledDiv location className="pl-1">
                    {location}
                </StyledDiv>
            </div>
        </div>
    );
};

export default Event;
