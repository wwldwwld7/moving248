import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/header/Header';
import ImgBox from '../../components/ImgBox/ImgBox';
import './MoverMyPageDetail.css';
import Buttons from '../UI/Buttons';
import MoverMyPageHistory from './MoverMyPageHistory';
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

    const handleDeleteClick = () => {
        console.log('되니?');
        setShowModal(true); // "회원 탈퇴" 버튼 클릭 시 Modal 표시
    };

    const handleModalClose = () => {
        console.log('닫어');
        setShowModal(false); // Modal 닫기
    };

    const handleConfirmDelete = () => {
        // 여기에 "예" 버튼 클릭 시 동작을 추가하면 됩니다.
        // 회원 탈퇴 등의 동작을 수행하거나 API 호출 등을 처리할 수 있습니다.
        // ...

        // Modal 닫기
        console.log('닫어2');

        setShowModal(false);
    };

    return (
        <div className='apply-detail'>
            <Header />
            <ImgBox imgSrc='moving-box' imgTitle='무버 마이페이지' />

            <section className='max-container section'>
                <div className='sec-two-one-container inner__section  overlap-imgbox'>
                    <div className='mypage-detail-flexbox'>
                        <h1 className='sec-two-container__h2'>마이페이지</h1>
                    </div>
                    <div className='mypage-detail-flexbox vertical-align-center'>
                        <div className='vertical-center'>
                            <h2>{userInfo.username} </h2>
                        </div>
                        <div className='vertical-center'>
                            <h3>연락처 : {userInfo.phone} </h3>
                        </div>
                        <div className='vertical-center'>
                            <h3>이메일 : {userInfo.email}</h3>
                        </div>
                        <div>
                            <img className='vertical-center-image' src={userInfo.profile_url} alt='Profile' />
                        </div>
                    </div>

                    <div className='mypage-detail-button-align'>
                        <Buttons type='button' text='정보 수정' small={true} />
                        <Buttons type='button' text='회원 탈퇴' small={true} delete={true} onClick={handleDeleteClick} />
                    </div>
                    <Modal
                        show={showModal}
                        onClose={handleModalClose}
                        message='정말로 회원 탈퇴하시겠습니까?' // Modal에 표시할 메시지
                        onConfirm={handleConfirmDelete} // "예" 버튼 클릭 시 동작
                    />
                </div>
                <MoverMyPageHistory />
            </section>

            <Footer />
        </div>
    );
};

export default MoverMyPageDetail;
