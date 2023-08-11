import React, { useState, useEffect } from 'react';
// import ReactDom from 'react-dom';
import './MoverMyPageDetail.css';
import Modal from '../UI/Modal';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import the Link component

const MoverMyPageDetail = props => {
    const [userInfo, setUserInfo] = useState({
        m_id: 1,
        name: '',
        password: '',
        phone: '',
        email: '',
        profile_url: '',
        list: [],
    });
    const [originalUserInfo, setOriginalUserInfo] = useState({}); // 원래 사용자 정보 저장

    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [phoneFormatError, setPhoneFormatError] = useState(false);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/member/user/${userInfo.m_id}`);
            setUserInfo(response.data.data);
            setOriginalUserInfo(response.data.data); // 원래 정보 설정

        } catch (error) {
            console.error('사용자 정보 가져오기 에러:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const [showModal, setShowModal] = useState(false); // Modal 표시 여부 상태
    const [showModalDelete, setShowModalDelete] = useState(false); // Modal 표시 여부 상태

    const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부 상태

    const handleDeleteClick = () => {
        setShowModal(true); // "회원 탈퇴" 버튼 클릭 시 Modal 표시
    };

    const handleModalClose = () => {
        setShowModal(false); // Modal 닫기
    };

    const handleConfirmDelete = async () => {
        try {
            const randomEmail = `randomemail${Math.floor(Math.random() * 1000)}@example.com`;

            const dataToUpdate = {
                email: randomEmail,
            };

            const response = await axios.put(`http://localhost:8080/member/user/${userInfo.m_id}`, dataToUpdate);
            setShowModal(false);
            setShowModalDelete(true);
            
        } catch (error) {
            console.error('회원 삭제 에러:', error);
        }
        setShowModal(false);
    };

    const handleEditClick = () => {
        setIsEditing(true); // 정보 수정 버튼 클릭 시 편집 모드 활성화
    };

    const handleCancelEdit = () => {
        setIsEditing(false); // 편집 모드 비활성화
        setUserInfo(originalUserInfo);
    };

    const handleSaveClick = async () => {
        try {
            const dataToUpdate = {
                password: userInfo.password,
                phone: userInfo.phone,
            };

            // Send the updated data to the server
            const response = await axios.put('http://localhost:8080/member/user/1', dataToUpdate);

            // Handle the response
            console.log('정보 수정 성공:', response.data);

            setIsEditing(false);
            fetchUserInfo();
        } catch (error) {
            console.error('정보 수정 에러:', error);
            // Handle the error
        }
    };

    const handleUserInfoChange = async e => {
        const { name, value } = e.target;

        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
        if (name === 'password') {
            setUpdatedPassword(value); // 변경할 패스워드 업데이트
            await checkPasswordMatch(); // 비밀번호 일치 검증

            // setUserInfo(prevUserInfo => ({
            //     ...prevUserInfo,
            //     [name]: value,
            // }));

            await checkPasswordMatch();
        } else if (name === 'phone') {
            // setUserInfo(prevUserInfo => ({
            //     ...prevUserInfo,
            //     [name]: value,
            // }));

            checkPhoneFormat();
        }
    };

    const checkPasswordMatch = async () => {
        if (userInfo.password !== userInfo.password_confirm) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
    };
    const checkPhoneFormat = () => {
        const phonePattern = /^\d{3}-\d{4}-\d{4}$/;

        if (!phonePattern.test(userInfo.phone)) {
            setPhoneFormatError(true);
        } else {
            setPhoneFormatError(false);
        }
    };

    const [updatedPassword, setUpdatedPassword] = useState('');

    useEffect(() => {
        checkPasswordMatch();
    }, [updatedPassword, userInfo.password_confirm]); // updatedPassword로 변경

    useEffect(() => {
        checkPasswordMatch();
    }, [userInfo.password, userInfo.password_confirm]);
    useEffect(() => {
        checkPhoneFormat();
    }, [userInfo.phone]);

    return (
        <div className='sec-two-one-container inner__section  overlap-imgbox'>
            <div className='mypage-detail-flexbox'>
                <h1 className='sec-two-container__h2'>마이페이지</h1>
            </div>
            <div className='mypage-detail-flexbox vertical-align-center'>
                <div className='vertical-center'>
                    <h3>
                        {isEditing ? (
                            <>
                                이름 : <input className='textarea-editing' name='name' value={userInfo.name} onChange={handleUserInfoChange} readOnly />
                            </>
                        ) : (
                            userInfo.name
                        )}
                    </h3>
                </div>
                <div className='vertical-center'>
                    <h3>이메일 : {isEditing ? <input className='textarea-editing' type='text' name='email' value={userInfo.email} onChange={handleUserInfoChange} readOnly /> : userInfo.email}</h3>
                </div>
                <div className='vertical-center'>
                    
                {isEditing ? (
        <>
            <h3>연락처</h3>
            <input className={`textarea-editing ${phoneFormatError ? 'input-error' : ''}`} type='text' name='phone' value={userInfo.phone} onChange={handleUserInfoChange} />
        </> 
    ) : (
        <h3>연락처: {userInfo.phone}</h3>
    )}
    {isEditing && (
        <div>{phoneFormatError && <span className='partner-mypage-error'>(000-0000-0000 형식으로 입력하세요)</span>}</div>
    )}
                </div>
                
                {isEditing ? (
                    <div className='vertical-center'>
                        <h3>변경할 패스워드</h3>
                        <input className='textarea-editing' type='password' name='password' onChange={handleUserInfoChange} />
                    </div>
                ) : (
                    ''
                )}
                {isEditing ? (
                    <div className='vertical-center'>
                        <h3>한번 더 입력 </h3>
                        <input className='textarea-editing' type='password' name='password_confirm' onChange={handleUserInfoChange} />
                        <div>{passwordMatchError && <span className='partner-mypage-error'>패스워드가 일치하지 않습니다.</span>}</div>
                    </div>
                ) : (
                    ''
                )}
                <div>
                    {isEditing ? (
                        <>
                            <h3>프로필 이미지</h3>
                            <input type='file' name='file' />
                            <div className='apply-form-innerbox-e'></div>
                        </>
                    ) : (
                        <img className='vertical-center-image' src={userInfo.profile_url || '/default-profile-image.png'} alt='Profile' />
                    )}
                </div>
            </div>

            <div className='mypage-detail-button-align'>
                {isEditing ? (
                    <>
                        <input className='button-modify' type='button' value={'저장'} onClick={handleSaveClick} />
                        <input className='button-modify' type='button' value={'취소'} onClick={handleCancelEdit}/>
                    </>
                ) : (
                    <input className='button-modify' type='button' value={'정보 수정'} onClick={handleEditClick} />
                )}
                <input className='button-delete' type='button' value={'회원 탈퇴'} onClick={handleDeleteClick} />
            </div>
            <Modal
                show={showModal}
                onClose={handleModalClose}
                message='정말로 회원 탈퇴하시겠습니까?' // Modal에 표시할 메시지
                onConfirm={handleConfirmDelete} // "예" 버튼 클릭 시 동작
            />
            <Modal
                show={showModalDelete}
                onClose={() => {
                    setShowModalDelete(false);
                    setUserInfo({  // Reset userInfo to its default values
                        m_id: 1,
                        name: '',
                        password: '',
                        phone: '',
                        email: '',
                        profile_url: '',
                        list: [],
                    });
                    props.history.push('/'); // Redirect to the home page after modal is closed
                }}
                message='계정이 성공적으로 삭제되었습니다.' 
                showFooter={false}
            />
        </div>
    );
};

export default MoverMyPageDetail;
