import React, { useState, useEffect } from 'react';
import './PartnerMyPageDetail.css';
import './MyPage.css';
import PartnerReview from './PartnerReview';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberActiveApplyAtom, memberIdAtom, memberTypeAtom } from '../../atom';
import InputBox from '../UI/InputBox';

const PartnerMyPageDetail = props => {
    const moveToHome = useNavigate();
    const { id } = useParams();
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const setMemberId = useSetRecoilState(memberIdAtom); // 회원탈퇴시 로컬이랑 쿠키 값 지우기위해
    const [reviewDatabase, setReviewDatabase] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [file, setFile] = useState(null);
    const [imageSrc, setImageSrc] = useState('');

    const isCurrentUser = memberId == id;

    const [partnerInfo, setPartnerInfo] = useState({
        p_id: 0,
        p_ceo: '',
        name: '',
        phone: '',
        password: '',
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
    const [originalPartnerInfo, setOriginalPartnerInfo] = useState({});

    const handleFileChange = fileBlob => {
        const selectedFile = fileBlob.target.files[0];

        // Check if a file was selected
        if (!selectedFile) {
            setFile(null);
            setImageSrc(partnerInfo.profile_url);
            return;
        }

        setFile(selectedFile);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = () => {
            setImageSrc(reader.result);
        };
    };

    const fetchPartnerInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/member/partner/${id}`);
            setPartnerInfo(response.data.data);
            setOriginalPartnerInfo(response.data.data);
            setReviewDatabase(response.data.data.list);
            setImageSrc(response.data.data.profile_url);
            console.log(response.data.data);
        } catch (error) {
            console.error('사용자 정보 가져오기 에러:', error);
        }
    };

    useEffect(() => {
        fetchPartnerInfo();
    }, []);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        // setPartnerInfo(originalPartnerInfo);
        fetchPartnerInfo();
    };

    const handleSubmit = async event => {
        // event.preventDefault();

        try {
            const jsonData = {
                p_ceo: partnerInfo.p_ceo,
                name: partnerInfo.name,
                phone: partnerInfo.phone,
                password: partnerInfo.password,
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
            alert('수정되었습니다.');
            setIsEditMode(false);
            fetchPartnerInfo();
        } catch (error) {
            console.error('정보 수정 에러:', error);
            // Handle the error
        }
    };

    const handleDelete = async () => {
        try {
            if (window.confirm('탈퇴하시겠습니까?')) {
                const response = await axios.delete(`http://localhost:8080/member/${id}`);
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

        setPartnerInfo(prevPartnerInfo => ({
            ...prevPartnerInfo,
            [name]: value,
        }));
        if (name === 'password' || name === 'checkPass' || name === 'phone') {
            const validators = {
                phone: value => /^\d{3}-\d{4}-\d{4}$/.test(value),
                password: value => /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(value),
                checkPass: value => value === partnerInfo.password,
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
        }
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

    const calculatedValue = partnerInfo.p_total_score / partnerInfo.p_review_cnt;
    const formattedValue = partnerInfo.p_review_cnt === 0 ? 0 : calculatedValue.toFixed(1);

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
                <div className='sec-two-one-container inner__section overlap-imgbox'>
                    <h2 className='sec-two-container__h2'>{partnerInfo.name}</h2>
                    <div className='profile__image-outer div-center'>
                        <img className='profile__image' src={imageSrc || '/default-profile-image.png'} alt='Profile' />
                    </div>
                    {memberType === 'u' && (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-static' type='button' value={'메시지 보내기'} />
                        </div>
                    )}
                    <div class='sec-two-container__divide display-hidden'></div>

                    <h2 className='sec-two-container__h2'>업체 정보</h2>

                    <div className='inner-half-outer'>
                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>대표명</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.p_ceo}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>평점</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>
                                {formattedValue}({partnerInfo.p_review_cnt})
                            </p>
                            <div className='sec-two-container__divide'></div>
                        </div>
                        <div className='inner-full'>
                            <h4 className='sec-two-container__h4 left-align'>연락처</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.phone}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>활동 지역</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.p_location}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>경력</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.p_exp}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>직원수</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.p_emp_cnt}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>연락 가능 시간</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>
                                {partnerInfo.p_starttime}시 ~ {partnerInfo.p_endtime}시
                            </p>
                            <div className='sec-two-container__divide'></div>
                        </div>
                    </div>

                    <div className='inner-full'>
                        <h4 className='sec-two-container__h4 left-align'>상세설명</h4>
                        <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.p_desc}</p>
                        <div className='sec-two-container__divide'></div>
                    </div>

                    {memberType === 'p' && !isEditMode ? (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-static' type='button' value={'수정'} onClick={handleEditClick} />
                        </div>
                    ) : (
                        <div className='message-button div-center message_btn'>
                            <input className='button-modify' type='button' value={'저장'} onClick={handleSubmit} />
                            <input className='button-modify' type='button' value={'취소'} onClick={handleCancelEdit} />
                            <input className='button-delete' type='button' value={'회원 탈퇴'} onClick={handleDelete} />
                        </div>
                    )}

                    {/* <table className='mypage-table'>
                    <tbody>
                        <h2>업체 정보</h2>
                        <hr></hr>
                        {isEditMode ? (
                            <>
                                <div className='mypage-table-double'>
                                    <div>
                                        <div>
                                            <span className='partner-innerbox-label'>연락처</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                <input className='partner-mypage-input-phone' type='text' name='phone' onChange={handleChange} placeholder={partnerInfo.phone} />
                                                {messages.phone && <div className={`message ${isValid.phone ? 'success' : 'error'}`}>{messages.phone}</div>}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <tr className='mypage-table-double'>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>대표명</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                <input className='partner-mypage-input' type='text' name='p_ceo' value={partnerInfo.p_ceo} readOnly />
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>활동지역</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                <input className='partner-mypage-input' type='text' name='p_location' value={partnerInfo.p_location} onChange={handleChange} />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='mypage-table-double'>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>평점</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                ★{parseFloat((partnerInfo.p_total_score / partnerInfo.p_review_cnt).toFixed(2))} ({partnerInfo.p_move_cnt})
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>경력</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                <input className='partner-mypage-input' type='text' name='p_exp' value={partnerInfo.p_exp} onChange={handleChange} />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='mypage-table-double'>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>직원수</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                <input className='partner-mypage-input' type='text' name='p_emp_cnt' value={partnerInfo.p_emp_cnt} onChange={handleChange} />
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>연락 가능 시간</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                <input className='partner-mypage-input' type='number' min='0' max='24' name='p_starttime' value={partnerInfo.p_starttime} onChange={handleChange} />
                                                시 ~&nbsp;
                                                <input className='partner-mypage-input' type='number' min='0' max='24' name='p_endtime' value={partnerInfo.p_endtime} onChange={handleChange} />시
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <>
                                <div className='mypage-table-double'>
                                    <div>
                                        <div>
                                            <span className='partner-innerbox-label'>연락처</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>{partnerInfo.phone}</span>
                                        </div>
                                    </div>
                                </div>
                                <tr className='mypage-table-double'>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>대표명</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>{partnerInfo.p_ceo}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>활동지역</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>{partnerInfo.p_location}</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='mypage-table-double'>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>평점</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                ★{parseFloat((partnerInfo.p_total_score / partnerInfo.p_review_cnt).toFixed(2))} ({partnerInfo.p_move_cnt})
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>경력</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>{partnerInfo.p_exp}년</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr className='mypage-table-double'>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>직원수</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>{partnerInfo.p_emp_cnt}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className='partner-innerbox-label'>연락 가능 시간</span>
                                        </div>
                                        <div>
                                            <span className='partner-innerbox-value'>
                                                {partnerInfo.p_starttime}시 ~ {partnerInfo.p_endtime}시
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>

                {isEditMode ? (
                    <div className='partner-innerbox'>
                        <div>
                            <h3>상세설명</h3>
                        </div>
                        <div>
                            <textarea className='profile-mypage-desc' type='textarea' name='p_desc' value={partnerInfo.p_desc} onChange={handleChange} />
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

                {isEditMode ? (
                    <>
                        <div className='partner-innerbox'>
                            <table className='mypage-table'>
                                <tbody>
                                    <tr>
                                        <div>
                                            <span className='partner-innerbox-label'>Password</span>
                                            <td>
                                                <span className='partner-innerbox-value'>
                                                    <div>
                                                        <input className='partner-mypage-input-password' type='password' name='password' onChange={handleChange} />
                                                        {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                                                    </div>
                                                </span>
                                            </td>
                                        </div>
                                    </tr>
                                    <tr>
                                        <div>
                                            <span className='partner-innerbox-label'>Password 확인</span>
                                            <td>
                                                <span className='partner-innerbox-value'>
                                                    <div>
                                                        <input className='partner-mypage-input-password' type='password' name='checkPass' onChange={handleChange} />
                                                        {messages.checkPass && <div className={`message ${isValid.checkPass ? 'success' : 'error'}`}>{messages.checkPass}</div>}
                                                    </div>
                                                </span>
                                            </td>
                                        </div>
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
                    isCurrentUser && <input className='button-modify' type='button' value={'정보 수정'} onClick={handleEditClick} />
                )} */}
                </div>
            ) : (
                <div className='sec-two-one-container inner__section overlap-imgbox'>
                    <h2 className='sec-two-container__h2'>{partnerInfo.name}</h2>
                    <div className='profile__image-outer div-center'>
                        <img className='profile__image' src={imageSrc || '/default-profile-image.png'} alt='Profile' />
                        <input type='file' name='file' onChange={handleFileChange}></input>
                    </div>
                    <div class='sec-two-container__divide display-hidden'></div>

                    <h2 className='sec-two-container__h2'>업체 정보</h2>

                    <div className='inner-half-outer'>
                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>대표명</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>{partnerInfo.p_ceo}</p>
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>평점</h4>
                            <p className='paragraph sec-two-container__paragraph left-align'>
                                {formattedValue}({partnerInfo.p_review_cnt})
                            </p>
                            <div className='sec-two-container__divide'></div>
                        </div>
                        <div className='inner-full'>
                            <h4 className='sec-two-container__h4 left-align'>연락처</h4>
                            <input className='partner-mypage-input-phone' type='text' name='phone' onChange={handleChange} value={partnerInfo.phone} />
                            {messages.phone && <div className={`message ${isValid.phone ? 'success' : 'error'}`}>{messages.phone}</div>}
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>활동 지역</h4>
                            <input className='partner-mypage-input' type='text' name='p_location' value={partnerInfo.p_location} onChange={handleChange} />
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>경력</h4>
                            <input className='partner-mypage-input' type='text' name='p_exp' value={partnerInfo.p_exp} onChange={handleChange} />
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>직원수</h4>
                            <input className='partner-mypage-input' type='text' name='p_emp_cnt' value={partnerInfo.p_emp_cnt} onChange={handleChange} />
                            <div className='sec-two-container__divide'></div>
                        </div>

                        <div className='inner-half'>
                            <h4 className='sec-two-container__h4 left-align'>연락 가능 시간</h4>
                            <span className='partner-innerbox-value'>
                                <input className='partner-mypage-input' type='number' min='0' max='24' name='p_starttime' value={partnerInfo.p_starttime} onChange={handleChange} />
                                시 ~&nbsp;
                                <input className='partner-mypage-input' type='number' min='0' max='24' name='p_endtime' value={partnerInfo.p_endtime} onChange={handleChange} />시
                            </span>
                            <div className='sec-two-container__divide'></div>
                        </div>
                    </div>

                    <div className='inner-full'>
                        <h4 className='sec-two-container__h4 left-align'>상세설명</h4>
                        <textarea className='profile-mypage-desc' type='textarea' name='p_desc' value={partnerInfo.p_desc} onChange={handleChange} />
                        <div className='sec-two-container__divide'></div>
                    </div>
                    <div className='inner-full'>
                        <h4 className='sec-two-container__h4 left-align'>비밀번호 변경</h4>
                        <input className='partner-mypage-input-phone' type='password' name='password' onChange={handleChange} placeholder='변경을 원치 않으시면 입력하지 마십쇼!' />
                        {messages.password && <div className={`message ${isValid.password ? 'success' : 'error'}`}>{messages.password}</div>}
                        <div class='sec-two-container__divide'></div>
                    </div>
                    {memberType === 'p' && !isEditMode ? (
                        <div className='message-button div-center message_btn'>
                            <input className='btn-static' type='button' value={'수정'} onClick={handleEditClick} />
                        </div>
                    ) : (
                        <div className='message-button div-center message_btn'>
                            <input className='button-modify' type='button' value={'저장'} onClick={handleSubmit} />
                            <input className='button-modify' type='button' value={'취소'} onClick={handleCancelEdit} />
                            <input className='button-delete' type='button' value={'회원 탈퇴'} onClick={handleDelete} />
                        </div>
                    )}
                </div>
            )}

            <div className='sec-two-two-container inner__section hb-scroll'>
                <div>
                    <h3>업체 후기</h3>
                </div>
                <div>
                    {reviewDatabase.map((review, index) => (
                        <PartnerReview key={index} name={review.name} rating={review.r_rate} date={review.r_create_time} content={review.r_content} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default PartnerMyPageDetail;
