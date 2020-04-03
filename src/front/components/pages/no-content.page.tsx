import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import literals from '../../resources/i18n/en.json';
import NoContentTemplate from '../templates/no-content.template';

const NoContent: React.FC = () => {
    const location = useLocation();
    let templateLiterals;
    let button;
    const history = useHistory();

    if ('/' === location.pathname) {
        templateLiterals = { noEvents: literals.noEvents };
        button = false;
    } else if ('/my-events' === location.pathname) {
        templateLiterals = {
            myEventsEmpty: literals.myEventsEmpty,
            seeAllAvailableEvents: literals.seeAllAvailableEvents,
        };
        button = true;
    }

    const handleClickGoToAllEvents = () => {
        history.push('/');
    };

    return (
        <NoContentTemplate
            literals={templateLiterals}
            {...{ button }}
            {...{ handleClickGoToAllEvents }}
        />
    );
};

export default NoContent;
