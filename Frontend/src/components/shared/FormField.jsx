
import React from 'react';
import styles from './shared.module.css';

const FormField = ({
    label,
    error,
    children,
    fullWidth = false,
    required = false,
    className = '',
}) => {
    const fieldClasses = [
        styles.formField,
        fullWidth ? styles.fullWidth : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={fieldClasses}>
            {label && (
                <label className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}
            {children}
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};

export default FormField;