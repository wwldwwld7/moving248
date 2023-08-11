import React, { useState, useEffect } from 'react';
import Modal from '../UI/Modal';
import './PartnerMyPageDetail.css';
import PartnerReview from './PartnerReview';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberActiveApplyAtom, memberIdAtom, memberTypeAtom } from '../../atom';

const PartnerMyPageDetail = props => {
    const { id } = useParams();
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);

    const isCurrentUser = memberId == id;

    const [partnerInfo, setPartnerInfo] = useState({
        p_id: 0,
        p_ceo: '',
        name: '',
        password: '',
        phone: '',
        p_exp: 0,
        p_emp_cnt: 0,
        p_starttime: '',
        p_endtime: '',
        p_desc: '',
        p_location: '',
        profile_url: '',
        p_move_cnt: '',
        p_total_socre: '',
        p_review_cnt: '',
        list: [],
    });

    const [reviewDatabase, setReviewDatabase] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal 표시 여부 상태
    const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부 상태
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [phoneFormatError, setPhoneFormatError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchPartnerInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/member/partner/${id}`);
            setPartnerInfo(response.data.data);
            setReviewDatabase(response.data.data.list);
            console.log(response.data.data);
        } catch (error) {
            console.error('사용자 정보 가져오기 에러:', error);
        }
    };

    useEffect(() => {
        fetchPartnerInfo();
    }, []);

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

    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('');

    const handleFileChange = fileBlob => {
        const selectedFile = fileBlob.target.files[0];

        // Check if a file was selected
        if (!selectedFile) {
            setFile(null);
            setImageSrc('');
            return;
        }

        setFile(selectedFile);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
            setImageSrc(reader.result);
        };
    };

    const handleSaveClick = async event => {
        // event.preventDefault();

        try {
            const jsonData = {
                p_ceo: partnerInfo.p_ceo,
                name: partnerInfo.name,
                password: partnerInfo.password,
                phone: partnerInfo.phone,
                p_exp: partnerInfo.p_exp,
                p_emp_cnt: partnerInfo.p_emp_cnt,
                p_starttime: partnerInfo.p_starttime,
                p_endtime: partnerInfo.p_endtime,
                p_desc: partnerInfo.p_desc,
                p_location: partnerInfo.p_location,
            };
            const formData = new FormData(); // Create a new FormData instance
            if (file) {
                formData.append('file', file);
            } else {
                formData.append('file', null);
            }
            formData.append(
                'data',
                new Blob([JSON.stringify(jsonData)], {
                    type: 'application/json',
                })
            );

            // Send the formData to the server
            const response = await axios.put(`http://localhost:8080/member/partner/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Handle the response
            console.log('정보 수정 성공:', response.data);

            if (response.data.profile_url) {
                setImageSrc(response.data.profile_url);
            }
            setIsEditing(false);
            fetchPartnerInfo();
        } catch (error) {
            console.error('정보 수정 에러:', error);
            // Handle the error
        }
    };

    const checkPasswordMatch = async () => {
        if (partnerInfo.password !== partnerInfo.password_confirm) {
            setPasswordMatchError(true);
        } else {
            setPasswordMatchError(false);
        }
    };
    const checkPhoneFormat = () => {
        const phonePattern = /^\d{3}-\d{4}-\d{4}$/;

        if (!phonePattern.test(partnerInfo.phone)) {
            setPhoneFormatError(true);
        } else {
            setPhoneFormatError(false);
        }
    };

    const [updatedPassword, setUpdatedPassword] = useState('');

    useEffect(() => {
        checkPasswordMatch();
    }, [updatedPassword, partnerInfo.password_confirm]); // updatedPassword로 변경

    useEffect(() => {
        checkPasswordMatch();
    }, [partnerInfo.password, partnerInfo.password_confirm]);
    useEffect(() => {
        checkPhoneFormat();
    }, [partnerInfo.phone]);

    const handlePartnerInfoChange = async e => {
        const { name, value } = e.target;

        if (name === 'password') {
            setUpdatedPassword(value); // 변경할 패스워드 업데이트
            await checkPasswordMatch(); // 비밀번호 일치 검증

            setPartnerInfo(prevPartnerInfo => ({
                ...prevPartnerInfo,
                [name]: value,
            }));

            await checkPasswordMatch();
        } else if (name === 'phone') {
            setPartnerInfo(prevPartnerInfo => ({
                ...prevPartnerInfo,
                [name]: value,
            }));

            checkPhoneFormat();
        } else if (name === 'profile_url') {
            setPartnerInfo(prevPartnerInfo => ({
                ...prevPartnerInfo,
                [name]: value,
            }));
        } else {
            setPartnerInfo(prevPartnerInfo => ({
                ...prevPartnerInfo,
                [name]: value,
            }));
        }
    };

    return (
        <>
            <div className='partner-outerbox'>
                {isEditing ? (
                    <div className='partner-innerbox-image'>
                        <h3>프로필 이미지</h3>
                        <input type='file' name='file' onChange={handleFileChange} />
                        <div className='apply-form-innerbox-e'></div>
                        {imageSrc ? <img src={imageSrc} controls></img> : <img src={partnerInfo.profile_url} alt='profile' />}
                    </div>
                ) : (
                    <div className='partner-overlab'>
                        <img className='partner-profile-image' src={partnerInfo.profile_url || '/default-profile-image.png'} alt='Profile' />
                    </div>
                )}
                <div className='partner-innerbox'>
                    <div className='partner-innerbox-inline-align'>
                        <h2>{partnerInfo.name}</h2>
                        {memberType === 'u' && !isEditing && (
                            <span className='messagebutton'>
                                <input className='button-send' type='button' value={'메시지 보내기'} />
                            </span>
                        )}
                    </div>
                    <table className='mypage-table'>
                        <tbody>
                            <tr>
                                <th>
                                    <span className='partner-innerbox-label'>대표자</span>
                                </th>
                                <td>
                                    <span className='partner-innerbox-value'>
                                        {isEditing ? (
                                            <input className='partner-mypage-input' type='text' name='p_ceo' value={partnerInfo.p_ceo} onChange={handlePartnerInfoChange} />
                                        ) : (
                                            partnerInfo.p_ceo
                                        )}
                                    </span>
                                </td>
                                <th>
                                    <span className='partner-innerbox-label'>지역</span>
                                </th>
                                <td>
                                    <span className='partner-innerbox-value'>
                                        {isEditing ? (
                                            <input className='partner-mypage-input' type='text' name='p_location' value={partnerInfo.p_location} onChange={handlePartnerInfoChange} />
                                        ) : (
                                            partnerInfo.p_location
                                        )}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <span className='partner-innerbox-label'>평점 </span>
                                </th>
                                <td>
                                    <span className='partner-innerbox-value'>
                                        ★{parseFloat((partnerInfo.p_total_score / partnerInfo.p_review_cnt).toFixed(2))} ({partnerInfo.p_move_cnt})
                                    </span>
                                </td>
                                <th>
                                    <span className='partner-innerbox-label'>경력</span>
                                </th>
                                <td>
                                    <span className='partner-innerbox-value'>
                                        {isEditing ? (
                                            <input className='partner-mypage-input' type='text' name='p_exp' value={partnerInfo.p_exp} onChange={handlePartnerInfoChange} />
                                        ) : (
                                            `${partnerInfo.p_exp}`
                                        )}
                                        년
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {isEditing ? (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>전화번호</h3>
                        </div>
                        <div>
                            <input className='partner-mypage-input-phone' type='text' name='phone' onChange={handlePartnerInfoChange} placeholder={partnerInfo.phone} />
                        </div>
                        <div>{phoneFormatError && <span className='partner-mypage-error'>전화번호 형식이 올바르지 않습니다. (000-0000-0000 형식으로 입력하세요)</span>}</div>
                        <div className='partner-innerbox-inline-pass'>
                            <div>
                                <h3>변경할 패스워드</h3>
                                <input className='partner-mypage-input-password' type='password' name='password' onChange={handlePartnerInfoChange} />
                            </div>
                            <div>
                                <h3>한번 더 입력</h3>
                                <input className='partner-mypage-input-password' type='password' name='password_confirm' onChange={handlePartnerInfoChange} />
                                <div>{passwordMatchError && <span className='partner-mypage-error'>패스워드가 일치하지 않습니다.</span>}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ' '
                )}
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
                            <input className='partner-mypage-input' type='number' min='0' max='24' name='p_starttime' value={partnerInfo.p_starttime} onChange={handlePartnerInfoChange} />시 ~&nbsp;
                            <input className='partner-mypage-input' type='number' min='0' max='24' name='p_endtime' value={partnerInfo.p_endtime} onChange={handlePartnerInfoChange} />시
                        </div>
                    </div>
                ) : (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>직원수</h3>
                        </div>
                        <div>{partnerInfo.p_emp_cnt} 명</div>
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
                        <div className='partner-desc'>{partnerInfo.p_desc}</div>
                    </div>
                )}

                <div className='partner-innerbox'>
                    <div>
                        <h3>업체 후기</h3>
                    </div>
                    <div>
                        {reviewDatabase.map((review, index) => (
                            <PartnerReview key={index} name={review.name} rating={review.r_rate} date={review.r_create_time} content={review.r_content} />
                        ))}
                    </div>
                </div>

                <div className='mypage-detail-button-align'>
                    {isEditing ? (
                        <>
                            <input className='button-modify' type='button' value={'저장'} onClick={handleSaveClick} />
                            <input className='button-modify' type='button' value={'취소'} onClick={() => setIsEditing(false)} />
                        </>
                    ) : (
                        isCurrentUser && (
                            <input className='button-modify' type='button' value={'정보 수정'} onClick={handleEditClick} />
                        )
                    )}
                    {isCurrentUser && (
                        <input className='button-delete' type='button' value={'회원 탈퇴'} onClick={handleDeleteClick} />
                    )}
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