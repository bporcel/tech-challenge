import React, { useState } from 'react';
import Literals from '../../models/literals.model'

interface Props {
    type: 'primary' | 'secondary' | 'close';
    initialText: string;
    id?: string;
    isHovereable?: boolean;
    literals?: Literals;
    handleClick: Function;
};

const Button: React.FC<Props> = ({
    type,
    handleClick,
    id,
    literals,
    isHovereable,
    initialText,
}) => {
    const [text, setText] = useState(initialText);

    const handleClickMiddleman = ({ target }) => {
        const { id } = target;
        handleClick(id);
    };

    const handleHover = (): void => {
        if (isHovereable) {
            if (text === literals.cancel) {
                setText(literals.youreIn);
            } else {
                setText(literals.cancel);
            }
        }
    };

    return (
        <button
            {...{ id }}
            className={`button ${type}`}
            onClick={handleClickMiddleman}
            onMouseOver={handleHover}
            onMouseOut={handleHover}
        >
            {text}
        </button>
    );
};

export default Button;
