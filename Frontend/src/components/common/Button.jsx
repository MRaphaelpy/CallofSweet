
import React from 'react';
import './Button.css';

const Button = ({
    type = 'button',
    label,
    onClick,
    disabled,
    primary,
    secondary,
    fullWidth
}) => {
    const classes = [
        'custom-button',
        primary ? 'primary' : '',
        secondary ? 'secondary' : '',
        fullWidth ? 'full-width' : '',
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {label}
        </button>
    );
};

export default Button;