import React from 'react';

export default function LoginButton(props) {
    return (
        <div className='col-12'>
            <input type={props.type} value={props.text} />
        </div>
    );
}
