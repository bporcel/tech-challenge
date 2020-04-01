import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Header from '../atoms/header.atom';

const StyledLayout = styled.div`
    padding: 0 500px 30% 30%;
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
