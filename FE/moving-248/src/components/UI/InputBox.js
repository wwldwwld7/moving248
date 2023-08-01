import React from 'react';
import classes from './InputBox.module.css';

const InputBox = props => {
    const { label, type, name, placeholder, required } = props;

    return (
        <div className='input-box'>
            <label>{label}</label>
            <input className={classes.input_field} type={type} name={name} placeholder={placeholder} required={required} />
        </div>
    );
};

export default InputBox;
