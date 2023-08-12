import React, { useState, useEffect } from 'react';
// import ReactDom from 'react-dom';
import './MoverMyPageDetail.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MoverMyPageDetail = props => {
    const moveToHome = useNavigate();
    const { id } = useParams();
    const [userInfo, setUserInfo] = useState({});
    const [originalUserInfo, setOriginalUserInfo] = useState({});

    const [isEditMode, setIsEditMode] = useState(false);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/member/user/${id}`);
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
            const response = await axios.put(`http://localhost:8080/member/user/${id}`, dataToUpdate);

            // Handle the response
            console.log('정보 수정 성공:', response.data);

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
            const response = await axios.delete(`http://localhost:8080/member/${id}`);
            console.log('회원 탈퇴 성공:', response.data);
            moveToHome('/');
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
        <div className='sec-two-one-container inner__section  overlap-imgbox'>
            <div className='mover-innerbox'>
                <div className='center-vertically'>
                    <h2>Mover</h2>
                    <img className='partner-profile-image' src={userInfo.profile_url} alt='Profile' />
                    <h2>{userInfo.name}</h2>
                </div>
            </div>

            {isEditMode ? (
                <>
                    <div className='mover-innerbox'>
                        <table className='mypage-table'>
                            <tbody>
                                <tr>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-label'>Email</p>
                                    </td>
                                    <td className='before-td'>
                                        <p className='user-innerbox-value'>{userInfo.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-label'>Phone</p>
                                    </td>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-value'>
                                            <input className='mover-mypage-input-phone' type='text' name='phone' placeholder={userInfo.phone} onChange={handleChange} />
                                            {messages.phone && <div className={`message ${isValid.phone ? 'success' : 'error'}`}>{messages.phone}</div>}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mover-innerbox'>
                        <table className='mypage-table'>
                            <tbody>
                                <tr>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-label'>Password</p>
                                    </td>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-value'>
                                            <input className='mover-mypage-input-password' type='password' name='password' onChange={handleChange} />
                                            {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-label'>Password 확인</p>
                                    </td>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-value'>
                                            <input className='mover-mypage-input-password' type='password' name='checkPass' onChange={handleChange} />
                                            {messages.checkPass && <div className={`message ${isValid.checkPass ? 'success' : 'error'}`}>{messages.checkPass}</div>}
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mypage-detail-button-align'>
                        <input className='button-modify' type='button' value={'저장'} onClick={handleSubmit} />
                        <input className='button-modify' type='button' value={'취소'} onClick={handleCancelEdit} />
                        <input className='button-delete' type='button' value={'회원 탈퇴'} onClick={handleDelete} />
                    </div>
                </>
            ) : (
                <>
                    <div className='mover-innerbox'>
                        <table className='mypage-table'>
                            <tbody>
                                <tr>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-label'>Email</p>
                                    </td>
                                    <td className='before-td'>
                                        <p className='user-innerbox-value'>{userInfo.email}</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-label'>Phone</p>
                                    </td>
                                    <td className='before-td'>
                                        <p className='mover-innerbox-value'>{userInfo.phone}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mypage-detail-button-align'>
                        <button className='button-modify' type='button' onClick={handleEditClick}>
                            {' '}
                            정보 수정{' '}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default MoverMyPageDetail;
