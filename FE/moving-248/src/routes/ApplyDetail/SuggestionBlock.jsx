import './SuggestionBlock.css';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberTypeAtom } from '../../atom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SuggestionBlock({ element, f_id, p_id, u_id }) {
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const room_id = 0;
    useEffect(() => {
        // console.log('[suggestion block] element : ');
        // console.log(element.p_id);
        // console.log(p_id + '+' + u_id);
        // console.log('[suggestion block] fid : ' + f_id);
    }, []);
    const moveUrl = useNavigate();
    const onQuestionHandler = () => {
        // moveUrl('/apply-form', { state: { isModify: id } });
        console.log(memberId);
        window.open(
            `/chat-list/chat-detail/${element.p_id}/${memberId}/${memberId}/${element.name}/${room_id}/${element.profile_url}`,
            `chat-detail${room_id}`,
            '_blank,left =500,top=0, width=480, height=920, resizable=no'
        );
    };

    // 견적서 확정 버튼 0
    const onConfirmHandler = () => {
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
            <img className='suggestion-block__image' src={element.profile_url} alt='img' />
            <div className='suggestion-block__content'>
                <h4 className='sec-two-container__h4'>{element.name}</h4>
                <p className='sec-two-container__paragraph'>
                    <b>{element.s_money.toLocaleString()}원</b>
                    <span className='paragraph sec-two-container__paragraph'>
                        &nbsp;&nbsp;|&nbsp;&nbsp;<b>이사 횟수</b> {element.p_move_cnt}
                    </span>
                </p>
                <p className='paragraph sec-two-container__paragraph'>{element.s_desc}</p>
                <br />
            </div>
            <div className='suggestion-block__btn-div'>
                {renderStatusMessage()}
                {/* 조건부 렌더링 */}
            </div>
        </div>
    );
}
