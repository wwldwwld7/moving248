import React, { useState } from 'react';

import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RenderMoverSignUpForm = props => {
    const [formData, setFormData] = useState({
        username: '',
        telephone: '',
        email: '',
        password: '',
        checkPass: '',
    });

    const [messages, setMessages] = useState({
        username: '',
        telephone: '',
        email: '',
        password: '',
        checkPass: '',
    });

    const [isValid, setIsValid] = useState({
        username: false,
        telephone: false,
        email: false,
        password: false,
        checkPass: false,
    });

    const changeHandler = e => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        const validators = {
            username: value => value.length >= 2 && value.length <= 5,
            telephone: value => /^\d{3}-\d{4}-\d{4}$/.test(value),
            email: value => /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value),
            password: value => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value),
            checkPass: value => value === formData.password,
        };

        const isValidInput = validators[name](value);

        setIsValid(prevState => ({
            ...prevState,
            [name]: isValidInput,
        }));
        setMessages(prevState => ({
            ...prevState,
            [name]: isValidInput ? '' : getErrorMessage(name),
        }));
    };

    const getErrorMessage = fieldName => {
        switch (fieldName) {
            case 'username':
                return '2글자 이상 5글자 미만으로 입력해주세요.';
            case 'email':
                return '올바른 이메일 형식이 아닙니다.';
            case 'telephone':
                return '형식에 맞게 번호를 입력해주세요.';
            case 'password':
                return '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.';
            case 'checkPass':
                return '비밀번호가 일치하지 않습니다.';
            default:
                return '';
        }
    };

    const moveToHome = useNavigate();
    const submitHandler = e => {
        e.preventDefault();

        const data = {
            name: formData.username,
            phone: formData.telephone,
            email: formData.email,
            password: formData.password,
        };

        axios
            .post('https://i9b301.p.ssafy.io/api/member/user', data)
            .then(res => {
                if (res.request.status === 201) {
                    alert('회원가입이 완료되었습니다.');
                    moveToHome('/');
                }
            })
            .catch(err => {
                if (err.response.status === 500) {
                    alert('이미 존재하는 이메일 입니다.');
                }
            });
    };

    const RenderButton = <Buttons type='submit' text='가입완료' disabled={!(isValid.username && isValid.email && isValid.telephone && isValid.password && isValid.checkPass)}></Buttons>;

    const RenderInputBox = (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <InputBox label='이름' type='text' name='username' placeholder='이름을 입력해주세요' required value={formData.username} onChange={changeHandler}>
                    {messages.username && <div className={`message ${isValid.username ? 'success' : 'error'}`}>{messages.username}</div>}
                </InputBox>

                <InputBox label='휴대폰번호' type='text' name='telephone' placeholder='010-0000-0000' required value={formData.telephone} onChange={changeHandler}>
                    {messages.telephone && <div className={`message ${isValid.telephone ? 'success' : 'error'}`}>{messages.telephone}</div>}
                </InputBox>

                <InputBox label='이메일' type='email' name='email' placeholder='example@ssafy.com' required value={formData.email} onChange={changeHandler}>
                    {messages.email && <div className={`message ${isValid.email ? 'success' : 'error'}`}>{messages.email}</div>}
                </InputBox>

                <InputBox label='비밀번호' type='password' name='password' placeholder='비밀번호를 입력해주세요' required value={formData.password} onChange={changeHandler}>
                    {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                </InputBox>

                <InputBox label='비밀번호 확인' type='password' name='checkPass' placeholder='다시 한번 입력해주세요' required value={formData.checkPass} onChange={changeHandler}>
                    {messages.checkPass && <div className={`message ${isValid.checkPass ? 'success' : 'error'}`}>{messages.checkPass}</div>}
                </InputBox>
                <div>{RenderButton}</div>
            </form>
        </div>
    );

    return (
        <div className='margin-box one-section'>
            <div className='sec-one-half-container'>
                <div className='login-logo'>
                    <img src={process.env.PUBLIC_URL + '/logo-rect.png'} alt='logo' />
                </div>
                <h1 className='center-align'>Welcome to 248</h1>
                <p className='center-align'>여러분의 행복한 이사에 함께합니다.</p>
                <div>{RenderInputBox}</div>
            </div>
        </div>
    );
};

export default RenderMoverSignUpForm;
