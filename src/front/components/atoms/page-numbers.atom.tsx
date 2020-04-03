import React from 'react';
import styled from 'styled-components';
import ControlledButton from '../atoms/controlled-button.atom';

const StyledPageNumbers = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 2em;
`;

interface Props {
    currentPage: number;
    totalPages: number;
    setCurrentPage: Function;
}

const PageNumbers: React.FC<Props> = ({
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    return (
        <StyledPageNumbers>
            {1 < currentPage && (
                <ControlledButton
                    text="Previous"
                    page
                    handleClick={(): void => setCurrentPage(currentPage - 1)}
                />
            )}
            <ControlledButton text={`${currentPage}`} />
            {currentPage < totalPages && (
                <ControlledButton
                    text="Next"
                    page
                    handleClick={(): void => setCurrentPage(currentPage + 1)}
                />
            )}
        </StyledPageNumbers>
    );
};

export default PageNumbers;
