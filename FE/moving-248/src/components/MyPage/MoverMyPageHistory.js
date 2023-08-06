import React, { useState, useEffect } from 'react';
// import ReactDom from 'react-dom';
import './MoverMyPageDetail.css';
import StarRating from '../UI/StarRating';
import Modal from '../UI/Modal';

const MoverMyPageHistory = props => {
    const [historyInfo, setHistoryInfo] = useState({
        f_id: 'P00421512',
        f_date: '2023.08.04',
        f_partnername: '승용이사',
        f_cost: '500,000',
        f_rate: '3',
        f_content: 'zz',
    });
    const [editingContent, setEditingContent] = useState(historyInfo.f_content);
    const [editingRate, setEditingRate] = useState(historyInfo.f_rate);

    const [isEditing, setIsEditing] = useState(false);

    const handleContentChange = event => {
        setEditingContent(event.target.value);
    };

    const handleRateChange = event => {
        setEditingRate(event.target.value);
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setHistoryInfo(prevHistoryInfo => ({
            ...prevHistoryInfo,
            f_content: editingContent,
            f_rate: editingRate,
        }));
        setIsEditing(false);
    };

    // historyInfo.f_content 값이 변경된 후에 실행되는 useEffect
    useEffect(() => {
        console.log(historyInfo.f_rate);
        console.log(historyInfo.f_content);
    }, [historyInfo.f_content, historyInfo.f_rate]);

    // const handleSaveClick = () => {
    //     setHistoryInfo(prevHistoryInfo => {
    //         const updatedHistoryInfo = {
    //             ...prevHistoryInfo,
    //             f_content: editingContent,
    //         };
    //         console.log(updatedHistoryInfo.f_content); // 변경된 값 출력
    //         return updatedHistoryInfo;
    //     });
    //     setIsEditing(false);
    // };

    return (
        <div className='sec-two-two-container inner__section'>
            <h2>지난 이사</h2>
            <div className='applyform-block'>
                <div className='applyform-block-left'>
                    <h4>{historyInfo.f_id}</h4>
                    <div className='p-margin'>
                        <b>일자 </b>
                        {historyInfo.f_date}
                    </div>
                    <p className='p-margin'>
                        <b>파트너 </b> {historyInfo.f_partnername}
                    </p>
                    <p className='p-margin'>
                        <b>비용 </b> {historyInfo.f_cost}원
                    </p>
                </div>
                <div className='applyform-block-right'>
                    <div className='star-rating'>
                        <b>평점 ({editingRate}.0/5.0)</b>
                        {isEditing ? <input type='number' value={editingRate} min='1' max='5' onChange={handleRateChange} className='rate-input' /> : <StarRating rating={editingRate} />}
                    </div>
                    <div className='comment-section'>
                        <b>후기</b>
                        {isEditing ? (
                            <>
                                <textarea className='textarea-editing' value={editingContent} onChange={handleContentChange} />
                                <button className='review-button' onClick={handleSaveClick}>
                                    저장
                                </button>
                            </>
                        ) : (
                            <>
                                <div>{historyInfo.f_content}</div>
                                <button className='review-button' onClick={handleEditClick}>
                                    편집
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoverMyPageHistory;
