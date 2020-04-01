import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Button from '../atoms/button.atom';
import { Event } from '../../models/events.model';
import Literals from '../../models/literals.model';

const StyledModal = styled.div`
    border: solid 1px;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: ${Theme.colors.white};
    width: 40%;
    height: 40%;
    & .modal-header {
        background-color: ${Theme.colors.lightGray};
    }

    & .modal-body {
        height: 65%;
        overflow-y: auto;
    }

    & .modal-footer {
        position: absolute;
        bottom: 1em;
        right: 1em;
    }
`;

interface Props {
    event: Event;
    literals: Literals;
    handleClickToogleModal: Function;
    handleClickJoin: Function;
}

const Modal: React.FC<Props> = ({
    handleClickToogleModal,
    handleClickJoin,
    event,
    literals,
}) => {
    document.onkeydown = event => {
        if (event.key === 'Escape') {
            handleClickToogleModal();
        }
    };

    const formatModalText = (): string => {
        const literalList = literals.modalSignUp.split('$');
        return `${literalList[0]}${event.name}${literalList[1]}${event.date}${literalList[2]}${event.city}`;
    };

    return (
        <StyledModal>
            <div className="d-flex flex-row justify-between align-center modal-header pd-1">
                <h2 className="title">Header del Modal</h2>
                <Button
                    type="close"
                    initialText={literals.x}
                    handleClick={handleClickToogleModal}
                />
            </div>
            <div className="modal-body pd-1">
                <p>{formatModalText()}</p>
                <p>Are you sure?</p>
            </div>
            <div className="d-flex flex-row modal-footer">
                <Button
                    type="cancel"
                    initialText={literals.cancel}
                    handleClick={handleClickToogleModal}
                />
                <div className="pl-1">
                    <Button
                        id={`${event.id}`}
                        type="primary"
                        initialText={literals.join}
                        handleClick={(id: string): void => {
                            handleClickJoin(id);
                            handleClickToogleModal();
                        }}
                    />
                </div>
            </div>
        </StyledModal>
    );
};

export default Modal;
