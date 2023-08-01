import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import RenderPartnerSignUpForm from '../../components/SignUp/RenderPartnerSignUpForm';

const PartnerSignUp = props => {
    return (
        <div>
            <h1>파트너 회원가입 페이지</h1>
            <h1>--------</h1>
            <RenderPartnerSignUpForm />
        </div>
    );
};

export default PartnerSignUp;
