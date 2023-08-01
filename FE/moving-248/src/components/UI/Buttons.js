import React from 'react';
import classes from './Buttons.module.css';

const Button = props => {
    return (
        <div className='col-12'>
            <input className={classes.button_field} type={props.type} value={props.text} />
        </div>
    );
};

export default Button;
