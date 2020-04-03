import React from 'react';
import styled from 'styled-components';
import Theme from '../../styles/theme';
import Button from '../atoms/button.atom';
import { Event } from '../../models/events.model';
import Literals from '../../models/literals.model';

const StyledBackground = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModal = styled.div`
    font-size: 16px;
    background-color: ${Theme.colors.white};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    changeButton: Function;
}

const Modal: React.FC<Props> = ({
    handleClickToogleModal,
    handleClickJoin,
    changeButton,
    event,
    literals,
}) => {
    document.onkeydown = (event): void => {
        if ('Escape' === event.key) {
            handleClickToogleModal();
        }
    };

    document.onclick = ({ target }: any): void => {
        const { id } = target;
        if ('background' === id) {
            handleClickToogleModal();
        }
    };

    const formatModalTextName = (): string => {
        const literalList = literals.modalSignUp.split('$');
        return `${literalList[0]}: `;
    };

    const formatModalTextDateAndLocation = (): string => {
        const literalList = literals.modalSignUp.split('$');
        return `${literalList[1]}${event.date}${literalList[2]}${event.city}${literalList[3]}${event.from}${literalList[4]}`;
    };

    return (
        <StyledBackground id="background">
            <StyledModal>
                <div className="d-flex flex-row justify-between align-items-baseline modal-header pd-1">
                    <h2 className="title mr-0">{literals.joinTheEvent}</h2>
                    <Button
                        type="close"
                        initialText={literals.x}
                        handleClick={handleClickToogleModal}
                    />
                </div>
                <div className="modal-body pd-1">
                    <p>
                        {formatModalTextName()}
                        <span className="bold">{event.name}</span>
                    </p>
                    <p>{formatModalTextDateAndLocation()}</p>
                    <p>Are you sure?</p>
                </div>
                <div className="d-flex flex-row modal-footer">
                    <Button
                        type="primary"
                        initialText={literals.cancel}
                        handleClick={handleClickToogleModal}
                    />
                    <div className="pl-1">
                        <Button
                            id={`${event.id}`}
                            type="secondary"
                            initialText={literals.join}
                            handleClick={(target): void => {
                                handleClickToogleModal();
                                handleClickJoin(target);
                                changeButton(target);
                            }}
                        />
                    </div>
                </div>
            </StyledModal>
        </StyledBackground>
    );
};

export default Modal;
