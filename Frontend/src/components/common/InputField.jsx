
import React from 'react';
import './InputField.css';

const InputField = ({
    label,
    type,
    name,
    value,
    onChange,
    placeholder,
    required,
    error
}) => {
    return (
        <div className="input-field">
            <label htmlFor={name}>
                {label} {required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={error ? 'error' : ''}
                required={required}
            />
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default InputField;