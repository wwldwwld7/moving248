import React, { useState } from 'react';

import './Checkbox.css'; // Checkbox에 대한 스타일을 정의한 CSS 파일을 임포트

const Checkbox = ({ name, checked, onChange, onClick }) => {
    return (
        <div className='checkbox' onClick={onClick}>
            <input name={name} type='checkbox' className='checkbox-input' checked={checked} onChange={onChange} />
            <div className='checkbox-custom'>{checked && <span className='checkmark'>&#x2713;</span>}</div>
        </div>
    );
};
export default Checkbox;
