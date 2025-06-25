
import React, { forwardRef } from 'react';
import styles from './shared.module.css';

const Input = forwardRef(({
    type = 'text',
    value,
    onChange,
    placeholder = '',
    disabled = false,
    required = false,
    maxLength,
    min,
    max,
    pattern,
    autoComplete,
    name,
    id,
    onFocus,
    onBlur,
    className = '',
}, ref) => {
    const inputClasses = [
        styles.input,
        disabled ? styles.disabled : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <input
            ref={ref}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            maxLength={maxLength}
            min={min}
            max={max}
            pattern={pattern}
            autoComplete={autoComplete}
            name={name}
            id={id}
            onFocus={onFocus}
            onBlur={onBlur}
            className={inputClasses}
        />
    );
});

Input.displayName = 'Input';

export default Input;