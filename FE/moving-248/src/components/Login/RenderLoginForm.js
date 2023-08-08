import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './RenderLoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Card from '../UI/Card';
import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';
import Modal from '../UI/Modal';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { memberEmailAtom, memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';

export default function RenderForm() {
    const settermemberName = useSetRecoilState(memberNameAtom); // react setState와 동일하게 동작함
    const settermemberEmail = useSetRecoilState(memberEmailAtom); // react setState와 동일하게 동작함
    const settermemberType = useSetRecoilState(memberTypeAtom); // react setState와 동일하게 동작함
    const settermemberId = useSetRecoilState(memberIdAtom); // react setState와 동일하게 동작함

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
                return '올바른 이메일 형식이 아닙니다.';
            case 'password':
                return '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.';
            default:
                return '';
        }
    };

    const [cookies, setCookie] = useCookies(['refreshToken']);
    const moveToHome = useNavigate();

    // 전역 변수 값 지정
    const modifyGlobalVar = data => {
        settermemberName(data.name);
        settermemberEmail(data.email);
        settermemberType(data.memberType);
        settermemberId(data.m_id);
    };

    const submitHandler = e => {
        e.preventDefault();

        const data = {
            email: formData.email,
            password: formData.password,
        };

        axios
            .post('/member/login', data)
            .then(res => {
                // res.data에 토큰 들어있음
                // local storage에 저장해서 모든 request의 header에 "Authorizatoin" 이름으로 박아야 함.!!!!!!!!!!!!!!!
                localStorage.setItem('accessToken', res.data.accessToken);
                setCookie('refreshToken', res.data.refreshToken);

                // 전역 변수 값 수정
                modifyGlobalVar(res.data);

                // 메인페이지로 이동
                moveToHome('/');
            })
            .catch(err => {
                if (err.response.status === 500) {
                    alert('이메일 또는 비밀번호를 잘못 입력했습니다.');
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
                    {messages.email && <div className={`eMessage ${isValid.email ? 'success' : 'error'}`}>{messages.email}</div>}
                </InputBox>

                <InputBox label='비밀번호' type='password' name='password' placeholder='비밀번호' required value={formData.password} onChange={changeHandler}>
                    {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                </InputBox>
                <Buttons type='submit' text='로그인' />
            </form>
            <div className='register-section'>
                <Link to={'/'}>비밀번호 찾기</Link>
                <span className='register-divider'>|</span>
                <Link to={'/mover-sign-up'}>회원가입</Link>
            </div>
            <div className='register-section2'>
                <Link to={'/partner-sign-up'}>파트너 등록이 필요하신가요? </Link>
            </div>

            {/* <Buttons type='button' text='카카오로 시작' />
            <Buttons type='button' text='네이버로 시작' />
            <Buttons type='button' text='구글로 시작' /> */}
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
                {renderForm}
                <Modal show={showModal} onClose={closeModalHandler} message={loginResult} />
            </div>
        </div>
    );
}
