import React, { useState, useEffect } from 'react';
// import ReactDom from 'react-dom';
import './MoverMyPageDetail.css';
import StarRating from '../UI/StarRating';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberActiveApplyAtom, memberIdAtom, memberTypeAtom } from '../../atom';

const MoverMyPageHistory = props => {
    const { id } = useParams();
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const setterActiveApply = useSetRecoilState(memberActiveApplyAtom);
    const moveUrl = useNavigate();

    const [historyList, setHistoryList] = useState([]);

    const fetchUserInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/member/user/${id}`);
            setHistoryList(response.data.data.list);
            console.log(response.data.data.list);
        } catch (error) {
            console.error('사용자 정보 가져오기 에러:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const handleContentChange = (event, index) => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList[index].r_content = event.target.value;
        setHistoryList(updatedHistoryList);
    };

    const handleRateChange = (event, index) => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList[index].r_rate = event.target.value;
        setHistoryList(updatedHistoryList);
    };

    const blockMargin = {
        marginLeft: 'auto',
        width: '100%',
    };

    // useEffect(() => {
    // 서버에서 사용자 정보 가져오는 로직을 수행
    const handleSaveClick = async (history, index) => {
        const jsonData = {
            u_id: 1,
            p_id: history.p_id,
            r_rate: history.r_rate,
            r_content: history.r_content,
        };

        try {
            const response = await axios.post(`http://localhost:8080/review`, jsonData); // 예시 URL
            fetchUserInfo();
            // const updatedHistoryList = [...historyList];
            // updatedHistoryList[index].r_id = response.data.data.r_id;
            // setHistoryList(updatedHistoryList);
        } catch (error) {
            console.error('후기 저장 에러:', error);
        }
    };

    // }, []);

    return (
        <div className='sec-two-two-container inner__section'>
            <h2>지난 이사</h2>
            {historyList.map((history, index) => (
                // <div className='suggestion-block'>
                //     <img className='suggestion-block__image' src={history.profile_url} alt='img' />
                //     <div className='suggestion-block__content'>
                //         <h4 className='sec-two-container__h4'>{history.name}</h4>
                //         <p className='sec-two-container__paragraph'>
                //             <b>{history.s_money.toLocaleString()}원</b>
                //             <span className='paragraph sec-two-container__paragraph'>
                //                 &nbsp;&nbsp;|&nbsp;&nbsp;<b>이사 횟수</b> {history.p_move_cnt}
                //             </span>
                //         </p>
                //         <p className='paragraph sec-two-container__paragraph'>{history.s_desc}</p>
                //         <br />
                //     </div>
                // </div>
                <div key={index} className='suggestion-block'>
                    <div className='mypage-block__image'>
                        <h4 className='sec-two-container__h4'>{history.name}</h4>
                        <div>
                            <p className='sec-two-container__paragraph'>
                                <b>일자 </b>
                                {history.f_date}
                            </p>
                            <p className='sec-two-container__paragraph'>
                                <b>비용 </b> {history.s_money}원
                            </p>
                        </div>
                    </div>
                    <div className='suggestion-block__content'>
                        <p className='sec-two-container__paragraph'>
                            <b>평점 ({history.r_rate}.0/5.0)&nbsp;</b>
                            {history.r_id === 0 ? (
                                <input className='input-number' type='number' value={history.r_rate} min='1' max='5' onChange={event => handleRateChange(event, index)} />
                            ) : (
                                <StarRating rating={history.r_rate} />
                            )}
                        </p>
                        <p className='sec-two-container__paragraph'>
                            <b>후기</b>
                            {history.r_id === 0 ? (
                                <>
                                    <textarea
                                        className='apply-form-desc'
                                        type='textarea'
                                        name='apply-form-desc'
                                        onChange={event => handleContentChange(event, index)}
                                        placeholder='리뷰를 등록하세요'
                                    ></textarea>
                                    <div className='suggestion-block__btn-outer'>
                                        <button className='btn-dynamic suggestion-block__btn' onClick={() => handleSaveClick(history, index)}>
                                            리뷰 등록
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>{history.r_content}</div>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default MoverMyPageHistory;
