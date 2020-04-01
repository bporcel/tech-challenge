import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import literals from '../../resources/i18n/en.json';
// @ts-ignore
import logo from '../../resources/images/logo.png';

const StyledLi = styled.li`
    & a {
        text-decoration: none;
        color: ${Theme.colors.darkGray};
    }

    & a.active {
        color: ${Theme.colors.blue};
    }

    & :hover {
        color: ${Theme.colors.lightBlue};
    }
`;

const StyledImg = styled.img`
    width: 10%;
`;

const Header: React.FC = () => {
    return (
        <>
            <div className="d-flex flex-row align-items-center pd-1">
                <StyledImg src={logo} alt="trivago logo" className="ml-1" />
                <nav className="menu">
                    <ul className="inline-list mr-0 pd-0">
                        <StyledLi className="pl-1">
                            <NavLink exact to="/" activeClassName="active">
                                {literals.allEvents}
                            </NavLink>
                        </StyledLi>
                        <StyledLi className="pl-1">
                            <NavLink
                                exact
                                to="/my-events"
                                activeClassName="active"
                            >
                                {literals.myEvents}
                            </NavLink>
                        </StyledLi>
                    </ul>
                </nav>
            </div>
            <hr className="separator mr-0" />
        </>
    );
};

export default Header;
