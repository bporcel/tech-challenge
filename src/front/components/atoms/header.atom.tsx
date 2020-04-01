import React from 'react';
import { NavLink } from 'react-router-dom';
import literals from '../../resources/i18n/en.json';
// @ts-ignore
import logo from '../../resources/images/logo.png';

const Header: React.FC = () => {
    return (
        <>
            <div className="d-flex flex-row align-items-center pd-1">
                <img src={logo} alt="trivago logo" className="logo" />
                <nav className="menu">
                    <ul className="inline-list mr-0 pd-0">
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
        </>
    );
};

export default Header;
