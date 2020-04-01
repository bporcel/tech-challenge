import React from 'react';
import Header from '../atoms/header.atom';

interface Props {
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="d-flex justify-center layout pb-500">
                {children}
            </div>
        </>
    );
};

export default Layout;
