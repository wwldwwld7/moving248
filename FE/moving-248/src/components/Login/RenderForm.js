import React, { useState } from 'react';
import './RenderForm.css';

import Card from './UI/Card';
import InputBox from './InputBox';
import LoginButton from './LoginButton';

export default function RenderForm() {
    const database = [
        { id: 1, username: 'user1', password: 'pass1' },
        { id: 2, username: 'user2', password: 'pass2' },
        { id: 3, username: 'user3', password: 'pass3' },
    ];
    const errors = {
        uname: 'invalid email',
        pass: 'invalid password',
    };

    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitHandler = e => {
        e.preventDefault();
        setErrorMessages({}); // Clear error messages
        var { uname, pass } = document.forms[0];

        // Find user login info
        const userData = database.find(user => user.username === uname.value);

        // Compare user info
        if (userData) {
            if (userData.password !== pass.value) {
                // Invalid password
                setErrorMessages({ name: 'pass', message: errors.pass });
            } else {
                setIsSubmitted(true);
            }
        } else {
            // Username not found
            setErrorMessages({ name: 'uname', message: errors.uname });
        }
    };

    const renderErrorMessage = name => errorMessages.name === name && <div className='error'>{errorMessages.message}</div>;

    const renderForm = (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <InputBox label='이메일' type='text' name='uname' placeholder='example@ssafy.com' required>
                    {renderErrorMessage('uname')}
                </InputBox>
                <InputBox label='비밀번호' type='password' name='pass' placeholder='비밀번호를 입력해주세요' required>
                    {renderErrorMessage('pass')}
                </InputBox>
                <LoginButton type='submit' text='이메일로 로그인하기' />
            </form>
            <div className='register-section'>
                <a href='/'>비밀번호 찾기</a>
                <span className='register-divider'>|</span>
                <a href='/'>회원가입</a>
            </div>
            <div className='register-section'>
                <a href='/'>파트너 이신가요? </a>
            </div>

            <LoginButton type='button' text='카카오로 시작' />
            <LoginButton type='button' text='네이버로 시작' />
            <LoginButton type='button' text='구글로 시작' />
        </div>
    );

    return (
        <Card className='login-form'>
            <div>
                <div className='title'>로그인</div>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </Card>
    );
}
