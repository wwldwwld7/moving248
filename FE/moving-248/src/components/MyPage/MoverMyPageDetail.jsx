import React, { useState, useEffect } from 'react';
import './MoverMyPageDetail.css';
import './MyPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberActiveApplyAtom, memberIdAtom, memberTypeAtom } from '../../atom';

const MoverMyPageDetail = props => {
    const moveToHome = useNavigate();
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const memberid = useRecoilValue(memberIdAtom);
    const setMemberId = useSetRecoilState(memberIdAtom); // 회원탈퇴시 로컬이랑 쿠키 값 지우기위해
    const [originalUserInfo, setOriginalUserInfo] = useState({});

    const [isEditMode, setIsEditMode] = useState(false);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`https://i9b301.p.ssafy.io/api/member/user/${id}`);
            setUserInfo(response.data.data);
            setOriginalUserInfo(response.data.data); // 원래 정보 설정
            const imageUrl = `/profile/${id % 10}.jpg`;

            setUserInfo(prevUserInfo => ({ ...prevUserInfo, profile_url: imageUrl }));
        } catch (error) {
            console.error('사용자 정보 가져오기 에러:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleEditClick = () => {
        setIsEditMode(true);
    };
    const handleSubmit = async () => {
        try {
            const dataToUpdate = {
                password: userInfo.password,
                phone: userInfo.phone,
            };

            // Send the updated data to the server
            const response = await axios.put(`https://i9b301.p.ssafy.io/api/member/user/${id}`, dataToUpdate);

            // Handle the response
            console.log('정보 수정 성공:', response.data);
            alert('수정되었습니다.');
            setIsEditMode(false);
            fetchUserInfo();
        } catch (error) {
            console.error('정보 수정 에러:', error);
            // Handle the error
        }
    };
    const handleCancelEdit = () => {
        setIsEditMode(false);
        setUserInfo(originalUserInfo);
        fetchUserInfo();
    };

    const handleDelete = async () => {
        try {
            if (window.confirm('탈퇴하시겠습니까?')) {
                const response = await axios.delete(`https://i9b301.p.ssafy.io/api/member/${id}`);
                localStorage.removeItem('accessToken');
                document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                setMemberId(``);

                moveToHome('/');
            }
        } catch (error) {
            console.error('회원 탈퇴 에러:', error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
        const validators = {
            phone: value => /^\d{3}-\d{4}-\d{4}$/.test(value),
            password: value => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value),
            checkPass: value => value === userInfo.password,
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

    const [messages, setMessages] = useState({
        phone: '',
        password: '',
        checkPass: '',
    });

    const [isValid, setIsValid] = useState({
        phone: false,
        password: false,
        checkPass: false,
    });
    const getErrorMessage = fieldName => {
        switch (fieldName) {
            case 'phone':
                return '형식에 맞게 번호를 입력해주세요.';
            case 'password':
                return '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요.';
            case 'checkPass':
                return '비밀번호가 일치하지 않습니다.';
            default:
                return '';
        }
    };

    return (
        <>
            {!isEditMode ? (
                <div className='sec-two-one-container inner__section overlap-imgbox mover-mypage__sec-two-one-container'>
                    <h2 className='sec-two-container__h2'>{userInfo.name}</h2>
                    <div className='profile__image-outer div-center'>
                        {/* <img className='profile__image' src={userInfo.profile_url} alt='Profile' /> */}
                        <img className='profile__image' src={require(`../../assets/image/profile/${id % 10}.jpg`)} alt='img' />
                    </div>
                    <div className='sec-two-container__divide display-hidden'></div>

                    <div className='inner-half-outer'>
                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>이메일</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{userInfo.email}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>전화번호</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{userInfo.phone}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>
                    </div>

                    {/* 아이디가 같은 경우에만 보임 */}
                    {memberid == id && !isEditMode ? (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-static' type='button' value={'수정'} onClick={handleEditClick} />
                        </div>
                    ) : (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-modify button-modify' type='button' value={'저장'} onClick={handleSubmit} />
                            <input className='btn-modify button-modify' type='button' value={'취소'} onClick={handleCancelEdit} />
                            <input className='btn-modify button-delete' type='button' value={'회원 탈퇴'} onClick={handleDelete} />
                        </div>
                    )}
                </div>
            ) : (
                <div className='sec-two-one-container inner__section overlap-imgbox mover-mypage__sec-two-one-container-edit'>
                    <h2 className='sec-two-container__h2'>{userInfo.name}</h2>
                    <div className='profile__image-outer div-center'>
                        {/* <img className='profile__image' src={userInfo.profile_url} alt='Profile' /> */}
                        <img className='profile__image' src={require(`../../assets/image/profile/${id % 10}.jpg`)} alt='img' />
                    </div>
                    <div class='sec-two-container__divide display-hidden'></div>

                    <div className='inner-half-outer'>
                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>이메일</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{userInfo.email}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>전화번호</h4>
                            <input className='partner-mypage-input-phone' type='text' name='phone' onChange={handleChange} value={userInfo.phone} />
                            {messages.phone && <div className={`message ${isValid.phone ? 'success' : 'error'}`}>{messages.phone}</div>}
                            <div className='sec-two-container__divide'></div>
                        </div>
                    </div>

                    <div className='inner-full'>
                        <h4 className='sec-two-container__h4 left-align'>비밀번호 변경</h4>
                        <input className='partner-mypage-input-phone' type='password' name='password' onChange={handleChange} placeholder='수정이 필요한 경우에만 입력해주세요.' />
                        {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                        <div class='sec-two-container__divide'></div>
                    </div>

                    {/* 아이디가 같은 경우에만 보임 */}
                    {memberid == id && !isEditMode ? (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-static' type='button' value={'수정'} onClick={handleEditClick} />
                        </div>
                    ) : (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-modify button-modify' type='button' value={'저장'} onClick={handleSubmit} />
                            <input className='btn-modify button-modify' type='button' value={'취소'} onClick={handleCancelEdit} />
                            <input className='btn-modify button-delete' type='button' value={'회원 탈퇴'} onClick={handleDelete} />
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MoverMyPageDetail;
