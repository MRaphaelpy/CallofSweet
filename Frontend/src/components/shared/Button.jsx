
import React from 'react';
import { motion } from 'framer-motion';
import styles from './shared.module.css';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    className = '',
}) => {
    const buttonClasses = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <motion.button
            className={buttonClasses}
            onClick={onClick}
            type={type}
            disabled={disabled}
            whileHover={disabled ? {} : { scale: 1.02 }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            {children}
        </motion.button>
    );
};

export default Button;