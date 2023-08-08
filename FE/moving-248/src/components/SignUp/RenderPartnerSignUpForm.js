import React, { useState } from 'react';

import Card from '../UI/Card';
import InputBox from '../UI/InputBox';
import Buttons from '../UI/Buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RenderMoverSignUpForm = props => {
    const [formData, setFormData] = useState({
        registnumber: '',
        telephone: '',
        email: '',
        password: '',
        checkPass: '',
    });

    const [messages, setMessages] = useState({
        registnumber: '',
        telephone: '',
        email: '',
        password: '',
        checkPass: '',
    });

    const [isValid, setIsValid] = useState({
        registnumber: false,
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
            registnumber: value => /^\d{3}-\d{2}-\d{5}$/.test(value),
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
            case 'registnumber':
                return '사업자 등록번호를 제대로 써주세요';
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

    const moveToHome = useNavigate();
    const submitHandler = e => {
        e.preventDefault();

        const data = {
            name: '업체명',
            p_code: formData.registnumber,
            p_ceo: '대표자명',
            phone: formData.telephone,
            email: formData.email,
            p_exp: '20130601',
            password: formData.password,
        };

        const registnumberEdit = formData.registnumber.substring(0, 3) + formData.registnumber.substring(4, 6) + formData.registnumber.substring(7);
        console.log(registnumberEdit);
        const check = {
            businesses: [
                {
                    b_no: registnumberEdit,
                    start_dt: '20130601',
                    p_nm: '유재호',
                    // "b_adr": "주소"
                },
            ],
        };

        axios
            .post('https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=3CKGYBOtgVvihLDVCJvG8yR2pdfk2hFo9nQbjJlKqk%2FHMCDYkKWk6tIisWU6mVT3fXwIbQRk6vYZAi6Sc7r81g%3D%3D', check)
            .then(res => {
                console.log(res.data.data[`0`].valid);
                if (res.data.data[`0`].valid === '01') {
                    axios
                        .post('/member/partner', data)
                        .then(res => {
                            if (res.request.statusText == 'Created') {
                                alert('회원가입 완료');
                                moveToHome('/');
                            }
                            // console.log(res);
                        })
                        .catch(err => {
                            if (err.response.status == 500) {
                                alert('이미 존재하는 이메일 입니다.');
                            }
                        });
                }
            })
            .catch(err => {
                alert('검정되지 않은 업체입니다.');
            });

        // Validation check
        // if (isValid.registnumber && isValid.email && isValid.telephone && isValid.password && isValid.checkPass) {
        //     console.log('Form submitted successfully!');
        // }

        // 넣어라 api call login here
    };

    const RenderButton = <Buttons type='submit' text='가입완료' disabled={!(isValid.registnumber && isValid.email && isValid.telephone && isValid.password && isValid.checkPass)}></Buttons>;

    const RenderInputBox = (
        <div className='form'>
            <form onSubmit={submitHandler}>
                <InputBox label='업체명' type='text' name='registname' placeholder='000-00-00000' required value={formData.registname} onChange={changeHandler}></InputBox>
                {/* {messages.registnumber && <div className={`message ${isValid.registnumber ? 'success' : 'error'}`}>{messages.registnumber}</div>} */}
                <InputBox label='대표자명' type='text' name='registceo' placeholder='000-00-00000' required value={formData.registnumber} onChange={changeHandler}>
                    {/* {messages.registnumber && <div className={`message ${isValid.registnumber ? 'success' : 'error'}`}>{messages.registnumber}</div>} */}
                </InputBox>

                <InputBox label='사업자등록번호' type='text' name='regist-number' placeholder='000-00-00000' required value={formData.registnumber} onChange={changeHandler}>
                    {messages.registnumber && <div className={`message ${isValid.registnumber ? 'success' : 'error'}`}>{messages.registnumber}</div>}
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
