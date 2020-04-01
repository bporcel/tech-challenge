import React from 'react';
import { useLocation } from 'react-router-dom';
import literals from '../../resources/i18n/en.json';
import NoContentTemplate from '../templates/no-content.template';

const NoContent: React.FC = () => {
    const location = useLocation();
    let text;

    if (location.pathname === '/') {
        text = literals.noEvents;
    } else if (location.pathname === '/my-events') {
        text = literals.myEventsEmpty;
    }

    return <NoContentTemplate {...{ text }} />;
};

export default NoContent;
