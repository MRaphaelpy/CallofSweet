
import React from 'react';
import './SelectField.css';

const SelectField = ({
    label,
    name,
    value,
    onChange,
    options,
    required,
    error
}) => {
    return (
        <div className="select-field">
            <label htmlFor={name}>
                {label} {required && <span className="required">*</span>}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? 'error' : ''}
                required={required}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default SelectField;