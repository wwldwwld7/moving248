import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RenderLoginForm.css';
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie"

import Card from '../UI/Card';
import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';
import Modal from '../UI/Modal';
import axios from 'axios';


export default function RenderForm() {
    const database = [
        { id: 1, email: '1@123.123', password: '111!!!aaa' },
        { id: 2, email: '2@123.123', password: '222@@@bbb' },
        { id: 3, email: '3@123.123', password: '333###ccc' },
    ];
    const [showModal, setShowModal] = useState(false);
    const closeModalHandler = () => {
        setShowModal(false);
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [messages, setMessages] = useState({
        email: '',
        password: '',
    });
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
    });
    const [loginResult, setLoginResult] = useState('');

    const changeHandler = e => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        const validators = {
            email: value => /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value),
            password: value => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value),
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
            case 'email':
                return '이메일 제대로 써주겠니?';
            case 'password':
                return '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!';
            default:
                return '';
        }
    };
    
    const [cookies, setCookie] = useCookies(["refreshToken"]);
    const moveToHome = useNavigate();
    const submitHandler = e => {
        e.preventDefault();


        const data = {
            email: formData.email,
            password: formData.password
        };

        axios.post('/member/login', data)
        .then((res) => {
            //res.data에 토큰 들어있음
            //local storage에 저장해서 모든 request의 header에 "Authorizatoin" 이름으로 박아야 함.!!!!!!!!!!!!!!!
            // console.log(res.data);
            localStorage.setItem("accessToken", res.data.accessToken);
            setCookie("refreshToken", res.data.refreshToken);
            console.log(localStorage.getItem("refeshToken"));
            //메인페이지로 이동
            moveToHome('/');
        })
        .catch((err) => {
            if(err.response.status===500){
                alert("이메일 또는 비밀번호를 잘못 입력했습니다.");
            }
        });

        // Validation check
        // if (isValid.email && isValid.password) {
        //     const matchedUser = database.find(user => user.email === formData.email && user.password === formData.password);

        //     if (matchedUser) {
        //         setShowModal(true);
        //         setLoginResult('Login successful!');
        //     } else {
        //         setShowModal(true);
        //         setLoginResult('Login failed. Invalid email or password.');
        //     }
        // }

        // 넣어라 api call login here
    };

    const renderForm = (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <InputBox label='이메일' type='text' name='email' placeholder='example@ssafy.com' required value={formData.username} onChange={changeHandler}>
                    {messages.email && <div className={`message ${isValid.email ? 'success' : 'error'}`}>{messages.email}</div>}
                </InputBox>
                <InputBox label='비밀번호' type='password' name='password' placeholder='비밀번호를 입력해주세요' required value={formData.password} onChange={changeHandler}>
                    {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                </InputBox>
                <Buttons type='submit' text='이메일로 로그인하기' />
            </form>
            <div className='register-section'>
                <Link to={'/'}>비밀번호 찾기</Link>
                <span className='register-divider'>|</span>
                <Link to={'/mover-sign-up'}>회원가입</Link>
            </div>
            <div className='register-section2'>
                <Link to={'/partner-sign-up'}>파트너 등록이 필요하신가요? </Link>
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
                {renderForm}
                <Modal show={showModal} onClose={closeModalHandler} message={loginResult} />
            </div>
        </Card>
    );
}
