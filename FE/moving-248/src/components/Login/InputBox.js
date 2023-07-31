import React from 'react';

const InputBox = props => {
    const { label, type, name, placeholder, required } = props;

    return (
        <div className='input-box'>
            <label>{label}</label>
            <input type={type} name={name} placeholder={placeholder} required={required} />
        </div>
    );
};

export default InputBox;
