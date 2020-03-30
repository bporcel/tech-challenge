import React from 'react';
import { NavLink } from 'react-router-dom';
import literals from '../../i18n/en.json';

type Props = {};

const Header: React.FC<Props> = () => {
    return (
        <div>
            <div className="d-flex flex-row pd-1">
                <div>LOGO</div>
                <nav>
                    <ul className="inline-list mr-0">
                        <li className="nav-item pl-1">
                            <NavLink exact to="/" activeClassName="active">
                                {literals.allEvents}
                            </NavLink>
                        </li>
                        <li className="nav-item pl-1">
                            <NavLink
                                exact
                                to="/my-events"
                                activeClassName="active"
                            >
                                {literals.myEvents}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <hr className="separator mr-0" />
        </div>
    );
};

export default Header;
