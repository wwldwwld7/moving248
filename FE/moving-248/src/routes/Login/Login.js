import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import RenderForm from '../../components/Login/RenderLoginForm';
import ImgBox from '../../components/ImgBox/ImgBox';

export default function Login() {
    return (
        <div className='login'>
            <ImgBox imgSrc='family-home' imgTitle='통합 로그인' />
            <RenderForm />
        </div>
    );
}
