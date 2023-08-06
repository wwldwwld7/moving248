import React, { useState, useEffect } from 'react';
import Buttons from '../UI/Buttons';
import Modal from '../UI/Modal';
import './PartnerMyPageDetail.css';
import PartnerReview from './PartnerReview';


const PartnerMyPageDetail = props => {
    const [partnerInfo, setPartnerInfo] = useState({
        m_id: 123,
        member_type:'p',
        email:'email@gmail.com',
        password:'123123',
        phone:'010-0100-0010',
        name:'승용이사',
        profile_url:'',
        p_ceo: '김승용',
        p_exp: 4,
        p_emp_cnt: '12',
        p_starttime:'09',
        p_endtime:'16',
        p_desc:'우리는 잘하는 이사업체111111111111111111111111111111',
        p_location:'대전시',
        p_move_cnt:716,
        p_code:'222-12-24212',
        p_total_score:1255,
        p_review_cnt:263,
    });
    
    const reviewDatabase = [
        {
            name: "현중",
            rating: 4,
            date: "2023-08-05",
            content: "굿잡"
        },
        {
            name: "승용",
            rating: 5,
            date: "2023-08-03",
            content: "너무조아요"
        }
    ];

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

    const handlePartnerInfoChange = e => {
        const { name, value } = e.target;

        setPartnerInfo(prevPartnerInfo => ({
            ...prevPartnerInfo,
            [name]: value,
        }));
    };

    return (
        <>
        <div className='partner-outerbox'>
            <div className='partner-innerbox'>
                <div className='partner-innerbox-inline-align'>
                    <h2>{partnerInfo.name}</h2>
                    <span>
                        <Buttons small={true} text='메시지보내기'></Buttons>
                    </span>
                </div>
                <div className='partner-innerbox-inline'>
                    <div>
                    <span className='partner-innerbox-label'>
                        대표자
                    </span>
                    <span className='partner-innerbox-value'>{isEditing ? <input className='partner-mypage-input' type='text' name='p_ceo' value={partnerInfo.p_ceo} onChange={handlePartnerInfoChange} /> : partnerInfo.p_ceo}</span>
                    </div>
                    <div>
                    <span className='partner-innerbox-label'>
                        지역
                    </span>
                    <span className='partner-innerbox-value'>{isEditing ? <input className='partner-mypage-input' type='text' name='p_location' value={partnerInfo.p_location} onChange={handlePartnerInfoChange} /> : partnerInfo.p_location}</span>
                    </div>
                </div>
                <div className='partner-innerbox-inline'>
                    <div>
                        <span className='partner-innerbox-label'>평점 </span> <span className='partner-innerbox-value'>★{parseFloat((partnerInfo.p_total_score / partnerInfo.p_review_cnt).toFixed(2))} ({partnerInfo.p_move_cnt})</span>
                    </div>
                    <div>
                        <span className='partner-innerbox-label'>경력</span> <span className='partner-innerbox-value'>
                            {isEditing ? <input className='partner-mypage-input' type='text' name='p_exp' value={partnerInfo.p_exp} onChange={handlePartnerInfoChange} /> : `${partnerInfo.p_exp}년`}
                        </span>
                    </div>
                </div>
            </div>
            {isEditing ? (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>직원수</h3>
                        </div>
                        <div>
                            <input className='partner-mypage-input' type='text' name='p_emp_cnt' value={partnerInfo.p_emp_cnt} onChange={handlePartnerInfoChange} />
                        </div>
                        <div>
                            <h3>연락 가능 시간</h3>
                        </div>
                        <div>
                        <input
                className='partner-mypage-input'
                type='number'
                min='0'
                max='24'
                name='p_starttime'
                value={partnerInfo.p_starttime}
                onChange={handlePartnerInfoChange}
            />시 ~&nbsp;
            <input
                className='partner-mypage-input'
                type='number'
                min='0'
                max='24'
                name='p_endtime'
                value={partnerInfo.p_endtime}
                onChange={handlePartnerInfoChange}
            />시
                        </div>
                    </div>
                ) : (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>직원수</h3>
                        </div>
                        <div>
                            {partnerInfo.p_emp_cnt} 명
                        </div>
                        <div>
                            <h3>연락 가능 시간</h3>
                        </div>
                        <div>
                            {partnerInfo.p_starttime}시 ~ {partnerInfo.p_endtime}시
                        </div>
                    </div>
                )}
                
                {isEditing ? (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>상세설명</h3>
                        </div>
                        <div>
                            <textarea className='profile-mypage-desc' type='textarea' name='p_desc' value={partnerInfo.p_desc} onChange={handlePartnerInfoChange} />
                        </div>
                    </div>
                ) : (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>상세설명</h3>
                        </div>
                        <div className='partner-desc'>
                            {partnerInfo.p_desc}
                        </div>
                    </div>
                )}

            <div className='partner-innerbox'>
                <div>
                    <h3>업체 후기</h3>
                </div>
                <div>
                {reviewDatabase.map((review, index) => (
                        <PartnerReview
                            key={index}
                            name={review.name}
                            rating={review.rating}
                            date={review.date}
                            content={review.content}
                        />
                    ))}
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

        
        </>
    );
};

export default PartnerMyPageDetail;