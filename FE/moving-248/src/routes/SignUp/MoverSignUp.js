import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import RenderMoverSignUpForm from '../../components/SignUp/RenderMoverSignUpForm';

const MoverSignUp = props => {
    return (
        <div>
            <h1>무버 회원가입 페이지</h1>
            <h1>--------</h1>
            <RenderMoverSignUpForm />
        </div>
    );
};

export default MoverSignUp;
