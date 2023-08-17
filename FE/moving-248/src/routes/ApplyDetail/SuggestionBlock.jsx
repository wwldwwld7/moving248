import './SuggestionBlock.css';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SuggestionBlock({ element, f_id, p_id, u_id }) {
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const memberName = useRecoilValue(memberNameAtom);
    const room_id = 0;
    const [cutUrl, setCutUrl] = useState('');
    const url = '';

    useEffect(() => {
        const changeUrl = setCutUrl();
    }, []);
    const moveUrl = useNavigate();
    const onQuestionHandler = () => {
        // moveUrl('/apply-form', { state: { isModify: id } });
        console.log(memberId);
        if (element.profile_url != null) {
            const url = element.profile_url.split('https://yeonybucket.s3.ap-northeast-2.amazonaws.com/file/');
            window.open(
                `/chat-list/chat-detail/${element.p_id}/${memberId}/${memberId}/${element.name}/${room_id}/${url[1]}`,
                `chat-detail${room_id}`,
                '_blank,left =500,top=0, width=480, height=920, resizable=no'
            );
        } else {
            window.open(
                `/chat-list/chat-detail/${element.p_id}/${memberId}/${memberId}/${element.name}/${room_id}/${element.profile_url}`,
                `chat-detail${room_id}`,
                '_blank,left =500,top=0, width=480, height=920, resizable=no'
            );
        }

        console.log(element.profile_url + '///232');
        console.log(url[1] + '232');
    };

    // 견적서 확정 버튼 0
    const onConfirmHandler = () => {
        axios
            .post(`http://localhost:8080/chat/message/${element.p_id}/${u_id}`, {
                m_id: u_id,
                message: `[공지] "${memberName}"님 신청서에 등록하신 견적이 확정되었습니다. <br /> <a href="/apply-detail/${f_id}" target='_blank'>바로가기</a>`,
            })
            .then(response => {
                console.log('확정메시지');
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        axios
            .put(`/form/suggestion/${f_id}/${element.p_id}`)
            .then(res => {
                alert('견적서가 확정 되었습니다.');
                window.location.reload();

                // if (res.)
            })
            .catch(error => {
                alert('견젹서 확정 도중 에러가 발생하였습니다.');
            });
    };

    const onCancelHandler = () => {
        axios
            .post(`http://localhost:8080/chat/message/${element.p_id}/${u_id}`, {
                m_id: u_id,
                message: `[공지] "${memberName}"님 신청서에 등록하신 견적의 확정이 취소되었습니다. <br /> <a href="/apply-detail/${f_id}" target='_blank'>바로가기</a>`,
            })
            .then(response => {
                // setMessage(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        axios
            .put(`/form/suggestion/${f_id}/${u_id}/${p_id}`)
            .then(res => {
                alert('견적서가 취소 되었습니다.');
                window.location.reload();
            })
            .catch(error => {
                alert('견젹서 취소 도중 에러가 발생하였습니다.');
            });
    };

    const renderStatusMessage = () => {
        //mover 인 경우
        if (memberType === 'u') {
            // 선택된 견적이 없는 경우
            console.log(p_id);
            if (p_id === 0) {
                return (
                    <div className='suggestion-block__btn-outer'>
                        <button className='btn-dynamic suggestion-block__btn' onClick={onQuestionHandler}>
                            문의하기
                        </button>
                        <button className='btn-dynamic suggestion-block__btn' onClick={onConfirmHandler}>
                            확정하기
                        </button>
                    </div>
                );
            }
            // 선택된 견적이 있는 경우
            else {
                // 선택된 견적인 경우
                if (element.is_selected === 't') {
                    return (
                        <div className='suggestion-block__btn-outer'>
                            <button className='btn-dynamic suggestion-block__btn' onClick={onQuestionHandler}>
                                문의하기
                            </button>
                            <button className='btn-dynamic suggestion-block__btn' onClick={onCancelHandler}>
                                취소하기
                            </button>
                        </div>
                    );
                }
                // 선택된 견적이 아닌 경우
                else {
                    return null;
                }
            }
        }
    };

    return (
        <div className='suggestion-block'>
            <Link to={`/partner-my-page/${element.p_id}`} className='suggestion-block__image no_blue'>
                <img src={element.profile_url} alt='img' className='hb_img' />
            </Link>
            <div className='suggestion-block__content'>
                <Link to={`/partner-my-page/${element.p_id}`} className='sec-two-container__h4 no_blue'>
                    <h4>{element.name}</h4>
                </Link>
                <p className='sec-two-container__paragraph'>
                    <b>{element.s_money.toLocaleString()}원</b>
                    <span className='paragraph sec-two-container__paragraph'>
                        &nbsp;&nbsp;<p>|&nbsp;&nbsp;이사 횟수 {element.p_move_cnt}</p>
                    </span>
                </p>
                <p className='paragraph sec-two-container__paragraph scoll-suggestion-inner'>{element.s_desc}</p>
                <br />
            </div>
            <div className='suggestion-block__btn-div'>
                {renderStatusMessage()}
                {/* 조건부 렌더링 */}
            </div>
        </div>
    );
}
