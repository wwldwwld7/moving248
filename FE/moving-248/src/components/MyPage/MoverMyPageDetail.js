import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import './MoverMyPageDetail.css';
import Buttons from '../UI/Buttons';
import Modal from '../UI/Modal';

const MoverMyPageDetail = props => {
    const [userInfo, setUserInfo] = useState({
        m_id: 1,
        username: '김현중',
        password: '',
        phone: '010-2402-2421',
        email: '1234@naver.com',
        profile_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/image/9befd15a-ff15-4b4e-853e-d13e7aef09d00e351634-3ffe-4299-bf96-1daaaab119a2.jpg',
    });

    const [showModal, setShowModal] = useState(false); // Modal 표시 여부 상태
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부 상태

    const handleDeleteClick = () => {
        setShowModal(true); // "회원 탈퇴" 버튼 클릭 시 Modal 표시
    };

    const handleModalClose = () => {
        setShowModal(false); // Modal 닫기
    };

    const handleConfirmDelete = () => {
        // 여기에 "예" 버튼 클릭 시 동작을 추가

        // Modal 닫기
        setShowModal(false);
    };

    const handleEditClick = () => {
        setIsEditing(true); // 정보 수정 버튼 클릭 시 편집 모드 활성화
    };

    const handleSaveClick = () => {
        // 여기에서 변경된 정보를 서버에 전송하고 편집 모드 비활성화

        setIsEditing(false); // 편집 모드 비활성화
    };

    const handleUserInfoChange = e => {
        const { name, value } = e.target;

        setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [name]: value,
        }));
    };

    return (
        <div className='sec-two-one-container inner__section  overlap-imgbox'>
                    <div className='mypage-detail-flexbox'>
                        <h1 className='sec-two-container__h2'>마이페이지</h1>
                    </div>
                    <div className='mypage-detail-flexbox vertical-align-center'>
                        <div className='vertical-center'>
                            <h2>{isEditing ? 
                            (
                            <>이름 :
                            <input className='textarea-editing'  name='username' value={userInfo.username} onChange={handleUserInfoChange} /> 
                            </>
                            )
                            : userInfo.username}</h2>
                        </div>
                        <div className='vertical-center'>
                        <h3>연락처 : {isEditing ? <input className='textarea-editing'  name='phone' value={userInfo.phone} onChange={handleUserInfoChange} /> : userInfo.phone}</h3>
                        </div>
                        <div className='vertical-center'>
                        <h3>이메일 : {isEditing ? <input type='text' name='email' value={userInfo.email} onChange={handleUserInfoChange} /> : userInfo.email}</h3>
                        </div>
                        <div>
                        {isEditing ? (
                            <>
                                <h3>이미지 URL :</h3>
                                <textarea className='textarea-editing' name='profile_url' value={userInfo.profile_url} onChange={handleUserInfoChange} />
                            </>
                            ) : (
                                <img className='vertical-center-image' src={userInfo.profile_url} alt='Profile' />
                            )}
                        </div>
                    </div>

                    <div className='mypage-detail-button-align'>
                    {isEditing ? (
                            <>
                                <Buttons type='button' text='저장' small={true} onClick={handleSaveClick} />
                                <Buttons type='button' text='취소' small={true} onClick={() => setIsEditing(false)} />
                            </>
                        ) : (
                            <Buttons type='button' text='정보 수정' small={true} onClick={handleEditClick} />
                        )}
                        <Buttons type='button' text='회원 탈퇴' small={true} delete={true} onClick={handleDeleteClick} />
                    </div>
                    <Modal
                        show={showModal}
                        onClose={handleModalClose}
                        message='정말로 회원 탈퇴하시겠습니까?' // Modal에 표시할 메시지
                        onConfirm={handleConfirmDelete} // "예" 버튼 클릭 시 동작
                    />
        </div>
    );
};

export default MoverMyPageDetail;
