import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import RenderForm from '../../components/Login/RenderLoginForm';
import ImgBox from '../../components/ImgBox/ImgBox';
import { Helmet } from 'react-helmet-async';

export default function Login() {
    return (
        <div className='login'>
            <Helmet>
                <title>248 | 로그인</title>
            </Helmet>
            <ImgBox imgSrc='family-home' imgTitle='통합 로그인' />
            <RenderForm />
        </div>
    );
}
