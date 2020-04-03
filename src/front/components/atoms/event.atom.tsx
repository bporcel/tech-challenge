import React from 'react';
import styled, { css } from 'styled-components';
import Theme from '../../styles/theme';

const StyledDiv = styled.div`
    ${(props): void =>
        (props.location &&
            css`
                font-size: ${Theme.font.size.body2};
                color: ${Theme.colors.darkGray};
                padding-left: 1.2em;
            `) ||
        (props.time &&
            css`
                font-size: ${Theme.font.size.bodyBig};
            `) ||
        (props.titl &&
            css`
                padding: 1.73em 0 1em 1em;
            `)}
`;

interface Props {
    from: string;
    duration: string;
    title: string;
    location: string | number;
}

const Event: React.FC<Props> = ({ from, duration, title, location }) => {
    return (
        <div className="d-flex flex-row align-items-center">
            <StyledDiv time className="pd-1">
                {from}
            </StyledDiv>
            <div className="d-flex flex-column">
                <StyledDiv titl>{title}</StyledDiv>
                <StyledDiv location>{`${location} - ${duration}`}</StyledDiv>
            </div>
        </div>
    );
};

export default Event;
