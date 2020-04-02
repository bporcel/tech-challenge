import React from 'react';
import styled from 'styled-components';
import Header from '../atoms/header.atom';

const StyledLayout = styled.div`
    margin-bottom: 500px;
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
