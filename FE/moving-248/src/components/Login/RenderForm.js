import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RenderForm.css';

import Card from '../UI/Card';
import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';

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
                <Buttons type='submit' text='이메일로 로그인하기' />
            </form>
            <div className='register-section'>
                <Link to={'/'}>비밀번호 찾기</Link>
                <span className='register-divider'>|</span>
                <Link to={'/'}>회원가입</Link>
            </div>
            <div className='register-section2'>
                <Link to={'/'}>파트너 등록이 필요하신가요? </Link>
            </div>

            <Buttons type='button' text='카카오로 시작' />
            <Buttons type='button' text='네이버로 시작' />
            <Buttons type='button' text='구글로 시작' />
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
