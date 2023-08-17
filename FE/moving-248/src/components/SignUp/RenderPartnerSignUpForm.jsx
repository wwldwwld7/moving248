import React, { useState } from 'react';

import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const RenderMoverSignUpForm = props => {
    const [formData, setFormData] = useState({
        registname: '',
        registceo: '',
        registnumber: '',
        registdate: '',
        telephone: '',
        email: '',
        password: '',
        checkPass: '',
    });

    const [messages, setMessages] = useState({
        registname: '',
        registceo: '',
        registnumber: '',
        registdate: '',
        telephone: '',
        email: '',
        password: '',
        checkPass: '',
    });

    const [isValid, setIsValid] = useState({
        registname: true,
        registceo: true,
        registnumber: false,
        registdate: true,
        telephone: false,
        email: false,
        password: false,
        checkPass: false,
    });

    // 검증 완료 여부 확인 함수
    const [authCheck, setAuthCheck] = useState(false);

    const changeHandler = e => {
        const { name, value } = e.target;

        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        const validators = {
            registname: value => value.trim() !== '',
            registceo: value => value.trim() !== '',
            registnumber: value => /^\d{3}-\d{2}-\d{5}$/.test(value),
            registdate: value => value.trim() !== '',
            telephone: value => /^\d{3}-\d{4}-\d{4}$/.test(value),
            email: value => /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(value),
            password: value => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value),
            checkPass: value => value === formData.password,
        };

        const isValidInput = validators[name] ? validators[name](value) : true;

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
            case 'registname':
                return '업체명을 입력해주세요.';
            case 'registceo':
                return '대표자명을 입력해주세요.';
            case 'registnumber':
                return '형식에 맞게 사업자 등록번호를 입력해주세요.';
            case 'registdate':
                return '설립일을 입력해주세요.';
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

    const [isReadOnly, setIsReadOnly] = useState(false);

    const checkValidPartner = async () => {
        const registnumberEdit = formData.registnumber.substring(0, 3) + formData.registnumber.substring(4, 6) + formData.registnumber.substring(7);
        // console.log(registnumberEdit);
        const check = {
            businesses: [
                {
                    b_no: registnumberEdit,
                    start_dt: formData.registdate,
                    p_nm: formData.registceo,
                },
            ],
        };

        if (formData.registname === '') {
            alert('입력이 누락되었습니다.');
            return;
        }

        axios
            .post('https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=3CKGYBOtgVvihLDVCJvG8yR2pdfk2hFo9nQbjJlKqk%2FHMCDYkKWk6tIisWU6mVT3fXwIbQRk6vYZAi6Sc7r81g%3D%3D', check)
            .then(res => {
                // console.log(res.data.data[`0`].valid);
                if (res.data.data[`0`].valid === '01') {
                    //api확인 완료
                    //확인되면 업체명, 대표자명, 사업자 등록번호, 설립일 readOnly로 변환
                    alert('업체 확인 완료되었습니다.');
                    setIsReadOnly(true);
                    setAuthCheck(true);
                } else {
                    alert('검증되지 않은 업체입니다. 다시 입력해주세요.');
                    setFormData(prevState => ({
                        ...prevState,
                        registname: '',
                        registceo: '',
                        registnumber: '',
                        registdate: '',
                    }));
                }
            })
            .catch(err => {
                alert('입력이 누락되었습니다.');
                console.log('catch');
            });
    };

    const moveToHome = useNavigate();
    const submitHandler = e => {
        e.preventDefault();

        const data = {
            name: formData.registname,
            p_code: formData.registnumber,
            p_ceo: formData.registceo,
            phone: formData.telephone,
            email: formData.email,
            p_exp: formData.registdate,
            password: formData.password,
        };
        axios
            .post('https://i9b301.p.ssafy.io/api/member/partner', data)
            .then(res => {
                if (res.request.statusText === 'Created') {
                    alert('파트너 회원가입이 완료되었습니다.');
                    moveToHome('/');
                }
                // console.log(res);
            })
            .catch(err => {
                if (err.response.status === 500) {
                    alert('이미 존재하는 이메일 입니다.');
                }
            });
    };

    const RenderButton = (
        <Buttons
            type='submit'
            text='가입완료'
            disabled={!(isValid.registname && isValid.registceo && isValid.registnumber && isValid.email && isValid.telephone && isValid.password && isValid.checkPass && authCheck)}
        ></Buttons>
    );

    const RenderInputBox = (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <InputBox label='업체명' type='text' name='registname' placeholder='업체명' required value={formData.registname} onChange={changeHandler} readOnly={isReadOnly}>
                    {messages.registname && <div className={`message ${isValid.registname ? 'success' : 'error'}`}>{messages.registname}</div>}
                </InputBox>
                <InputBox label='대표자명' type='text' name='registceo' placeholder='대표자명' required value={formData.registceo} onChange={changeHandler} readOnly={isReadOnly}>
                    {messages.registceo && <div className={`message ${isValid.registceo ? 'success' : 'error'}`}>{messages.registceo}</div>}
                </InputBox>

                <InputBox label='사업자등록번호' type='text' name='registnumber' placeholder='000-00-00000' required value={formData.registnumber} onChange={changeHandler} readOnly={isReadOnly}>
                    {messages.registnumber && <div className={`message ${isValid.registnumber ? 'success' : 'error'}`}>{messages.registnumber}</div>}
                </InputBox>
                <InputBox label='사업자설립일' type='text' name='registdate' placeholder='20230808' required value={formData.registdate} onChange={changeHandler} readOnly={isReadOnly}>
                    {messages.registdate && <div className={`message ${isValid.registdate ? 'success' : 'error'}`}>{messages.registdate}</div>}
                </InputBox>

                <Buttons type='button' text='사업자 체크' onClick={checkValidPartner}></Buttons>
                <div className={`sub ${authCheck ? 'sub-ok' : 'sub-not'}`}>{authCheck ? '사업자 체크 완료' : '사업자 체크를 진행해주세요'}</div>

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
