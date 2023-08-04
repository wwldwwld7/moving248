import React, { useState } from 'react';

import Card from '../UI/Card';
import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';

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
                return '이메일 제대로 써주겠니?';
            case 'telephone':
                return '폰번호 제대로 써주세요';
            case 'password':
                return '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!';
            case 'checkPass':
                return '입력한 비밀번호와 맞지 않아요. 확인부탁 ㅜ ㅜ';
            default:
                return '';
        }
    };

    const submitHandler = e => {
        e.preventDefault();

        // Validation check
        if (isValid.username && isValid.email && isValid.telephone && isValid.password && isValid.checkPass) {
            console.log('Form submitted successfully!');
        }

        // 넣어라 api call login here
    };

    const RenderButton = <Buttons type='submit' text='회원가입' disabled={!(isValid.username && isValid.email && isValid.telephone && isValid.password && isValid.checkPass)}></Buttons>;

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
        <Card>
            <div className='title'>회원가입</div>
            <div>{RenderInputBox}</div>
        </Card>
    );
};

export default RenderMoverSignUpForm;
