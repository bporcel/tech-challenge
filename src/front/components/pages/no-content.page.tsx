import React from 'react'
import literals from '../../resources/i18n/en.json';
import NoContentTemplate from '../templates/no-content.template';

const NoContent: React.FC = () => {

    const templateLiterals = {
        myEventsEmpty: literals.myEventsEmpty,
        here: literals.here
    }

    return <NoContentTemplate literals={templateLiterals} />
}

export default NoContent;