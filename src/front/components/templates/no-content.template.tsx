import React from 'react';
import { NavLink } from 'react-router-dom';
import Literals from '../../models/literals.model';

interface Props {
    literals: Literals;
}

const NoContentTemplate: React.FC<Props> = ({ literals }) => {
    const formatEmptyEventsLiteral = (): JSX.Element => {
        const literalsList = literals.myEventsEmpty.split('$');
        return (
            <h1 className="title">
                {literalsList[0]}
                <span className="nav-item">
                    <NavLink exact to="/">
                        {literals.here}
                    </NavLink>
                </span>
                {literalsList[1]}
            </h1>
        );
    };

    return <div className="bordered">{formatEmptyEventsLiteral()}</div>;
};

export default NoContentTemplate;
