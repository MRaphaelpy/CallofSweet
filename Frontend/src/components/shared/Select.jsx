
import React, { forwardRef } from 'react';
import styles from './shared.module.css';

const Select = forwardRef(({
    value,
    onChange,
    options = [],
    placeholder = 'Select an option',
    disabled = false,
    required = false,
    name,
    id,
    className = '',
}, ref) => {
    const selectClasses = [
        styles.select,
        disabled ? styles.disabled : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <select
            ref={ref}
            value={value}
            onChange={onChange}
            disabled={disabled}
            required={required}
            name={name}
            id={id}
            className={selectClasses}
        >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
});

Select.displayName = 'Select';

export default Select;