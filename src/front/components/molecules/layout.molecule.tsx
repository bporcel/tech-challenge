import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Header from '../atoms/header.atom';

const StyledLayout = styled.div`
    min-height: 46vh;
    padding: 0 500px 30% 30%;
    background-color: ${Theme.colors.lightGray};
`;

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <StyledLayout className="d-flex justify-center">
                {children}
            </StyledLayout>
        </>
    );
};

export default Layout;
