import { useEffect, useState } from 'react';
import ImgBox from '../../components/ImgBox/ImgBox';
import './ApplyDetail.css';
import { useNavigate } from 'react-router-dom';

import SuggestionBlock from './SuggestionBlock';
import SuggestionForm from './SuggestionForm';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberTypeAtom } from '../../atom';

export default function ApplyDetail() {
    const { id } = useParams();

    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    // const user_status = 2; // 전역으로 사용할 것임
    // const user_id = 4; // 전역으로 사용할 것임

    const moveUrl = useNavigate();

    const [apply, setApply] = useState({
        f_id: 0,
        u_id: 0,
        p_id: 0,
        userName: '',
        f_category: '',
        f_date: '',
        f_dep_sido: '',
        f_dep_gungu: '',
        f_dep_ev: '',
        f_dep_ladder: '',
        f_arr_sido: '',
        f_arr_gungu: '',
        f_arr_ev: '',
        f_arr_ladder: '',
        f_room_video_url: '',
        f_req_desc: '',
        f_status: 0,
    });

    const [suggestion, setSuggestion] = useState({
        list: [],
    });

    // 처음 페이지 도착 시 실행 할 코드
    useEffect(() => {
        axios.get(`/form/${id}`).then(res => {
            const importData = res.data.data;
            // console.log(importData.list);
            setApply(importData);
            setSuggestion(importData);
            // console.log(suggestion);
        });

        suggestion.list
            .filter(element => element.p_id === memberId)
            .map(element => {
                // console.log(element);
                return setMySuggestion({
                    s_desc: element.s_desc,
                    s_money: element.s_money,
                });
            });
    }, []);

    const [mySuggestion, setMySuggestion] = useState({
        s_money: 0,
        s_desc: '',
    });

    const renderSelected = () => {
        return (
            <>
                <h2 className='left-align'>확정된 견적서</h2>
                {apply.f_status === 2 || apply.f_status === 3 ? (
                    suggestion.list
                        .filter(element => element.is_selected === 't')
                        .map(element => {
                            // console.log('element:' + element);
                            return <SuggestionBlock element={element} f_status={apply.f_status} />;
                        })
                ) : (
                    <div className='suggestion-block center-align'>확정된 견적서가 없습니다.</div>
                )}
            </>
        );
    };

    const renderAll = () => {
        return (
            <>
                <div className='sub-division'></div>
                <h2 className='left-align'>제안된 견적서</h2>
                {suggestion.list.length !== 0 ? (
                    suggestion.list
                        // .filter(element => element.is_selected !== 't')
                        .map(element => {
                            return <SuggestionBlock element={element} f_status={apply.f_status} />;
                        })
                ) : (
                    <div className='suggestion-block center-align'>작성된 견적서가 없습니다.</div>
                )}
            </>
        );
    };

    const renderSuggestionForm = () => {
        return (
            <>
                {
                    // 파트너인 경우
                    memberType === 'p' ? <SuggestionForm mySuggestion={mySuggestion} /> : null
                }
            </>
        );
    };

    const moverModifyHandler = () => {
        moveUrl('/apply-form', { state: { isModify: id } });
    };

    const renderSuggestionBtn = () => {
        return (
            <>
                {memberType === 'u' ? (
                    <div className='suggestion-block__btn-outer'>
                        <button className='btn-dynamic suggestion-block__btn' onClick={moverModifyHandler}>
                            수정하기
                        </button>
                        {/* <button className='btn-dynamic suggestion-block__btn' onClick={moverDeleteClickHandler}>삭제하기</button> */}
                    </div>
                ) : null}
            </>
        );
    };

    return (
        <div className='apply-detail'>
            {/* {console.log(apply)} */}
            {/* {console.log(`type${memberTypeAtom}`)} */}
            <ImgBox imgSrc='moving-box' imgTitle='신청서 상세' />

            <section className='max-container section'>
                {/* [S] 요청 신청서 */}
                <div className='sec-two-one-container inner__section  overlap-imgbox'>
                    <h2 className='sec-two-container__h2'>
                        "{apply.userName}"님 요청 신청서 <p className='sub'>{apply.f_status === 1 ? '입찰중' : apply.f_status === 2 ? '입찰 완료' : '이사 완료'}</p>
                    </h2>

                    <h4 className='sec-two-container__h4'>이사 종류</h4>
                    <p className='paragraph sec-two-container__paragraph'>{apply.f_category}</p>
                    <div className='sec-two-container__divide'></div>

                    <h4 className='sec-two-container__h4'>이사 날짜</h4>
                    <p className='paragraph sec-two-container__paragraph'>{apply.f_date}</p>
                    <div className='sec-two-container__divide'></div>

                    <h4 className='sec-two-container__h4'>출발 장소</h4>
                    <div className='apply-detail__location-div'>
                        <p className='paragraph sec-two-container__paragraph sec-two-container__paragraph-with-icon'>
                            {apply.f_dep_sido} {apply.f_dep_gungu}
                        </p>
                        <div>
                            {apply.f_dep_ev === 't' ? (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator.png`)} alt='img' />
                            ) : (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator-gray.png`)} alt='img' />
                            )}
                            {apply.f_dep_ladder === 't' ? (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck.png`)} alt='img' />
                            ) : (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck-gray.png`)} alt='img' />
                            )}
                        </div>
                    </div>
                    <div className='sec-two-container__divide'></div>

                    <h4 className='sec-two-container__h4'>도착 장소</h4>

                    <div className='apply-detail__location-div'>
                        <p className='paragraph sec-two-container__paragraph sec-two-container__paragraph-with-icon'>
                            {apply.f_arr_sido} {apply.f_arr_gungu}
                        </p>

                        <div>
                            {apply.f_arr_ev === 't' ? (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator.png`)} alt='img' />
                            ) : (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator-gray.png`)} alt='img' />
                            )}
                            {apply.f_arr_ladder === 't' ? (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck.png`)} alt='img' />
                            ) : (
                                <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck-gray.png`)} alt='img' />
                            )}
                        </div>
                    </div>

                    <div className='sec-two-container__divide'></div>

                    <h4 className='sec-two-container__h4'>자택 영상</h4>
                    <video className='sec-two-container__paragraph' src={apply.f_room_video_url} controls>
                        이 브라우저에서 지원하지 않는 영상입니다.
                    </video>
                    <div className='sec-two-container__divide'></div>

                    <h4 className='sec-two-container__h4'>무버 요청 사항</h4>
                    <p className='paragraph sec-two-container__paragraph'>{apply.f_req_desc}</p>
                    {renderSuggestionBtn()}
                </div>

                {/* [S] 견적서 */}
                <div className='sec-two-two-container inner__section'>
                    {/* 확정된 견적서 */}
                    {renderSelected()}
                    {/* 제안된 견적서 */}
                    {renderAll()}

                    {/* 견적서 작성 Form */}
                    {renderSuggestionForm()}
                </div>
            </section>
        </div>
    );
}
