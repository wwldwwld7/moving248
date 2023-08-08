import React, { useState, useEffect } from 'react';
// import ReactDom from 'react-dom';
import './MoverMyPageDetail.css';
import StarRating from '../UI/StarRating';

const MoverMyPageHistory = props => {
    const [historyList, setHistoryList] = useState([
        {
            f_id: 'P00421512',
            f_date: '2023.08.04',
            f_partnername: '승용이사',
            f_cost: '500,000',
            f_rate: '3',
            f_content: 'zz',
        },
        {
            f_id: 'P004212525',
            f_date: '2023.09.10',
            f_partnername: '현중이사',
            f_cost: '100,000',
            f_rate: '4',
            f_content: '굿',
        },
        {
            f_id: 'P004212525',
            f_date: '2023.09.10',
            f_partnername: '현중이사',
            f_cost: '100,000',
            f_rate: '4',
            f_content: '굿',
        },
        {
            f_id: 'P004212525',
            f_date: '2023.09.10',
            f_partnername: '현중이사',
            f_cost: '100,000',
            f_rate: '4',
            f_content: '굿',
        },
    ]);
    // const [editingContent, setEditingContent] = useState(historyInfo.f_content);
    // const [editingRate, setEditingRate] = useState(historyInfo.f_rate);

    // const [isEditing, setIsEditing] = useState(false);

    const handleContentChange = (event, index) => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList[index].f_content = event.target.value;
        setHistoryList(updatedHistoryList);
    };

    const handleRateChange = (event, index) => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList[index].f_rate = event.target.value;
        setHistoryList(updatedHistoryList);
    };

    const handleEditClick = index => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList[index].isEditing = true;
        setHistoryList(updatedHistoryList);
    };

    const handleSaveClick = index => {
        const updatedHistoryList = [...historyList];
        updatedHistoryList[index].isEditing = false;
        setHistoryList(updatedHistoryList);
    };

    // // historyInfo.f_content 값이 변경된 후에 실행되는 useEffect
    // useEffect(() => {
    //     console.log(historyInfo.f_rate);
    //     console.log(historyInfo.f_content);
    // }, [historyInfo.f_content, historyInfo.f_rate]);

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
        <div className='sec-two-two-container inner__section hb-scroll'>
            <h2>지난 이사</h2>
            {historyList.map((history, index) => (
                <div key={index} className='applyform-block'>
                    <div className='applyform-block-left'>
                        <h4>{history.f_id}</h4>
                        <div className='p-margin'>
                            <b>일자 </b>
                            {history.f_date}
                        </div>
                        <p className='p-margin'>
                            <b>파트너 </b> {history.f_partnername}
                        </p>
                        <p className='p-margin'>
                            <b>비용 </b> {history.f_cost}원
                        </p>
                    </div>
                    <div className='applyform-block-right'>
                        <div className='star-rating'>
                            <b>평점 ({history.f_rate}.0/5.0)</b>
                            {history.isEditing ? (
                                <input type='number' value={history.f_rate} min='1' max='5' onChange={event => handleRateChange(event, index)} className='rate-input' />
                            ) : (
                                <StarRating rating={history.f_rate} />
                            )}
                        </div>
                        <div className='comment-section'>
                            <b>후기</b>
                            {history.isEditing ? (
                                <>
                                    <textarea className='textarea-editing-hb' value={history.f_content} onChange={event => handleContentChange(event, index)} />
                                    <button className='review-button' onClick={() => handleSaveClick(index)}>
                                        저장
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div>{history.f_content}</div>
                                    <button className='review-button' onClick={() => handleEditClick(index)}>
                                        편집
                                    </button>
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
