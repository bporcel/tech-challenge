import React from 'react';
import Header from '../atoms/header.atom';

type Props = {
    children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <div className="d-flex justify-center layout pd-500">
                {children}
            </div>
        </>
    );
};

export default Layout;
