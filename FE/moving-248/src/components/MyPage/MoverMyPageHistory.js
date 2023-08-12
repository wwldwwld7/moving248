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
        <div className='sec-two-two-container inner__section hb-scroll'>
            <h2>지난 이사</h2>
            {historyList.map((history, index) => (
                <div key={index} className='applyform-block'>
                    <div className='applyform-block-left'>
                        {/* <h4>{history.f_id}</h4> */}
                        <div className='p-margin'>
                            <b>일자 </b>
                            {history.f_date}
                        </div>
                        <p className='p-margin'>
                            <b>파트너 </b> {history.name}
                        </p>
                        <p className='p-margin'>
                            <b>비용 </b> {history.s_money}원
                        </p>
                    </div>
                    <div className='applyform-block-right'>
                        <div className='star-rating'>
                            <b>평점 ({history.r_rate}.0/5.0)</b>
                            {history.r_id === 0 ? (
                                <input type='number' value={history.r_rate} min='1' max='5' onChange={event => handleRateChange(event, index)} className='rate-input' />
                            ) : (
                                <StarRating rating={history.r_rate} />
                            )}
                        </div>
                        <div className='comment-section'>
                            <b>후기</b>
                            {history.r_id === 0 ? (
                                <>
                                    <textarea className='textarea-editing-hb' value={history.r_content} onChange={event => handleContentChange(event, index)} />
                                    <button className='review-button' onClick={() => handleSaveClick(history, index)}>
                                        저장
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div>{history.r_content}</div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default MoverMyPageHistory;
