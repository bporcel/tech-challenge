import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import { NavLink } from 'react-router-dom';
import Literals from '../../models/literals.model';

const StyledNoContent = styled.div`
    background-color: ${Theme.colors.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & a {
        text-decoration: none;
        color: ${Theme.colors.orange};
    }

    & a:hover {
        color: ${Theme.colors.blue};
    }
`;

interface Props {
    text: string;
}

const NoContentTemplate: React.FC<Props> = ({ text }) => {
    return (
        <StyledNoContent className="bordered pd-1">
            <h1 className="title">{text}</h1>
        </StyledNoContent>
    );
};

export default NoContentTemplate;
