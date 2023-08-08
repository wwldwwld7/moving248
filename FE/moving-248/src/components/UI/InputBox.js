import React, { useState, useEffect } from 'react';
import classes from './InputBox.module.css';

const InputBox = props => {
    const { label, type, name, placeholder, required, value, onChange } = props;

    const hasError = props.children && props.children.props.className.includes('error');

    const isValid = !hasError; // Determine validity based on error status

    return (
        <div className={`${classes.input_box}`}>
            {/* <label>{label}</label> */}
            <input
                label={label}
                className={`${classes.input_field} ${!isValid ? classes.invalid : ''}`}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
            />
            {/* Optionally, you can display the error message here for better placement */}
            {props.children}
        </div>
    );
};

export default InputBox;
