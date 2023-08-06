import React from 'react';
import classes from './Buttons.module.css';

const Button = props => {
    const buttonClass = props.small ? classes.button_field_small : classes.button_field;

    const buttonClass2 = props.delete ? classes.button_field_small_delete : classes.button_field;

    return (
        // <div>
        <input
            className={`${buttonClass} ${buttonClass2}`}
            type={props.type}
            value={props.text}
            onClick={props.onClick} // onClick 이벤트 추가
        />
        // </div>
    );
};

export default Button;
