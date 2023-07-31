import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import RenderForm from '../../components/Login/RenderForm';

export default function Login() {
    return (
        <div className='login'>
            <h1>로그인페이지</h1>
            <h1>--------</h1>
            <RenderForm />
        </div>
    );
}
