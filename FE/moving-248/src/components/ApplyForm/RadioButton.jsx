import React from 'react';
import './RadioButton.css';

const RadioButton = ({ options, selectedOption, onChange }) => {
    return (
        <div className='radio-group'>
            {options.map((option, index) => (
                <label key={index} className='radio-label dynamic'>
                    <input type='radio' className='radio-input' value={option.value} checked={selectedOption === option.value} onChange={() => onChange(option.value)} />
                    <span className='radio-custom'></span>
                    {option.label}
                </label>
            ))}
        </div>
    );
};

export default RadioButton;
