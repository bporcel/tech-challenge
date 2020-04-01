import React from 'react';
import Button from '../atoms/button.atom';
import { Event } from '../../models/events.model';
import Literals from '../../models/literals.model';

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
    document.onkeydown = (event) => {
        if (event.key === 'Escape') {
            handleClickToogleModal();
        }
    }

    const formatModalText = (): string => {
        const literalList = literals.modalSignUp.split('$');
        return `${literalList[0]}${event.name}${literalList[1]}${event.date}${literalList[2]}${event.city}`;
    };

    return (
        <div className="modal">
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
                    type="primary"
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
        </div>
    );
};

export default Modal;
