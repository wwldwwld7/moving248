import { useEffect, useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/header/Header';
import ImgBox from '../../components/ImgBox/ImgBox';
import './ApplyDetail.css';

import SuggestionBlock from './SuggestionBlock';
import SuggestionForm from './SuggestionForm';
export default function ApplyDetail() {
    const user_status = 2; // 전역으로 사용할 것임
    const user_id = 4; // 전역으로 사용할 것임

    const [apply, setApply] = useState({
        f_id: 1,
        u_id: 2,
        p_id: 3,
        name: '신승헌',
        f_category: '포장이사',
        f_date: '2022-08-02',
        f_dep_sido: '서울시',
        f_dep_gungu: '강남구',
        f_dep_ev: 'f',
        f_dep_ladder: 't',
        f_arr_sido: '경상북도 예천시',
        f_arr_gungu: '승용구',
        f_arr_ev: 'f',
        f_arr_ladder: 'f',
        f_room_video_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/video/7ff6b500-b98a-4372-8aba-427b8e2e7db76b6f5a29-f8ed-4ec9-ae86-7e2bfb7fd855.mp4',
        f_req_desc: '승용이도 용달에 실어주시나요?',
        f_status: 2,
    });

    const [suggestion, setSuggestion] = useState({
        list: [
            {
                p_id: 3,
                name: '이사왕김이사',
                profile_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/image/9befd15a-ff15-4b4e-853e-d13e7aef09d00e351634-3ffe-4299-bf96-1daaaab119a2.jpg',
                p_move_cnt: 50,
                s_money: 5000000,
                s_desc: '이 문서는 김승용의 대단함을 알리기 위한 글이며, 어떠한 사유로도 무단으로 보관 복제 삭제하거나 제 3자에게 누설 하는 행위를 금합니다.   ㅁ',
                s_create_time: '2023-07-05',
                is_selected: 't',
            },
            {
                p_id: 4,
                name: '라현이사',
                profile_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/image/9befd15a-ff15-4b4e-853e-d13e7aef09d00e351634-3ffe-4299-bf96-1daaaab119a2.jpg',
                p_move_cnt: 50,
                s_money: 5000000,
                s_desc: '이 문서는 김승용의 대단함을 알리기 위한 글이며, 어떠한 사유로도 무단으로 보관 복제 삭제하거나 제 3자에게 누설 하는 행위를 금합니다.   ㅁ',
                s_create_time: '2023-07-05',
                is_selected: 'f',
            },
            {
                p_id: 5,
                name: '승용이사',
                profile_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/image/9befd15a-ff15-4b4e-853e-d13e7aef09d00e351634-3ffe-4299-bf96-1daaaab119a2.jpg',
                p_move_cnt: 50,
                s_money: 5000000,
                s_desc: '이 문서는 김승용의 대단함을 알리기 위한 글이며, 어떠한 사유로도 무단으로 보관 복제 삭제하거나 제 3자에게 누설 하는 행위를 금합니다.   ㅁ',
                s_create_time: '2023-07-05',
                is_selected: 'ㄹ',
            },
        ],
    });

    useEffect(() => {
        suggestion.list
            .filter(element => element.p_id === user_id)
            .map(element => {
                // console.log(element);
                return setMySuggestion({
                    s_desc: element.s_desc,
                    s_money: element.s_money,
                });
            });
        // console.log(mySuggestion);
    }, [suggestion]);

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
                {/* 아이디가 파트너일 때만 작성 가능하도록 수정해야 함! */}
                {
                    // 파트너인 경우
                    user_status === 2 ? <SuggestionForm mySuggestion={mySuggestion} /> : null
                }
            </>
        );
    };

    return (
        <div className='apply-detail'>
            <Header />
            <ImgBox imgSrc='moving-box' imgTitle='신청서 상세' />

            <section className='max-container section'>
                {/* [S] 요청 신청서 */}
                <div className='sec-two-one-container inner__section  overlap-imgbox'>
                    <h2 className='sec-two-container__h2'>
                        "{apply.name}"님 요청 신청서 <p className='sub'>{apply.f_status === 1 ? '입찰중' : apply.f_status === 2 ? '입찰 완료' : '이사 완료'}</p>
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

            <Footer />
        </div>
    );
}

// import { useState } from 'react';
// import Footer from '../../components/Footer/Footer';
// import Header from '../../components/header/Header';
// import ImgBox from '../../components/ImgBox/ImgBox';
// import './ApplyDetail.css';

// import SuggestionBlock from './SuggestionBlock';
// export default function ApplyDetail() {
//     const [apply, setApply] = useState({
//         f_id: 1,
//         u_id: 2,
//         p_id: 3,
//         name: '신승헌',
//         f_category: '포장이사',
//         f_date: '2022-08-02',
//         f_dep_sido: '서울시',
//         f_dep_gungu: '강남구',
//         f_dep_ev: 'f',
//         f_dep_ladder: 't',
//         f_arr_sido: '경상북도 예천시',
//         f_arr_gungu: '승용구',
//         f_arr_ev: 'f',
//         f_arr_ladder: 'f',
//         f_room_video_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/video/7ff6b500-b98a-4372-8aba-427b8e2e7db76b6f5a29-f8ed-4ec9-ae86-7e2bfb7fd855.mp4',
//         f_req_desc: '승용이도 용달에 실어주시나요?',
//         f_status: 1,
//     });

//     return (
//         <div className='apply-detail'>
//             <Header />
//             <ImgBox imgSrc='moving-box' imgTitle='신청서 상세' />

//             <section className='max-container section'>
//                 {/* [S] 요청 신청서 */}
//                 <div className='sec-two-one-container inner__section  overlap-imgbox'>
//                     <h2 className='sec-two-container__h2'>
//                         "{apply.name}"님 요청 신청서 <p className='sub'>{apply.f_status === 1 ? '입찰중' : apply.f_status === 2 ? '입찰 완료' : '이사 완료'}</p>
//                     </h2>

//                     <h4 className='sec-two-container__h4'>이사 종류</h4>
//                     <p className='paragraph sec-two-container__paragraph'>{apply.f_category}</p>
//                     <div className='sec-two-container__divide'></div>

//                     <h4 className='sec-two-container__h4'>이사 날짜</h4>
//                     <p className='paragraph sec-two-container__paragraph'>{apply.f_date}</p>
//                     <div className='sec-two-container__divide'></div>

//                     <h4 className='sec-two-container__h4'>출발 장소</h4>
//                     <div className='apply-detail__location-div'>
//                         <p className='paragraph sec-two-container__paragraph sec-two-container__paragraph-with-icon'>
//                             {apply.f_dep_sido} {apply.f_dep_gungu}
//                         </p>
//                         <div>
//                             {apply.f_dep_ev === 't' ? (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator.png`)} alt='img' />
//                             ) : (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator-gray.png`)} alt='img' />
//                             )}
//                             {apply.f_dep_ladder === 't' ? (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck.png`)} alt='img' />
//                             ) : (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck-gray.png`)} alt='img' />
//                             )}
//                         </div>
//                     </div>
//                     <div className='sec-two-container__divide'></div>

//                     <h4 className='sec-two-container__h4'>도착 장소</h4>

//                     <div className='apply-detail__location-div'>
//                         <p className='paragraph sec-two-container__paragraph sec-two-container__paragraph-with-icon'>
//                             {apply.f_arr_sido} {apply.f_arr_gungu}
//                         </p>

//                         <div>
//                             {apply.f_arr_ev === 't' ? (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator.png`)} alt='img' />
//                             ) : (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/elevator-gray.png`)} alt='img' />
//                             )}
//                             {apply.f_arr_ladder === 't' ? (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck.png`)} alt='img' />
//                             ) : (
//                                 <img className='apply-detail__icon' src={require(`../../assets/image/icon/ladder-truck-gray.png`)} alt='img' />
//                             )}
//                         </div>
//                     </div>

//                     <div className='sec-two-container__divide'></div>

//                     <h4 className='sec-two-container__h4'>자택 영상</h4>
//                     <video className='sec-two-container__paragraph' src={apply.f_room_video_url} controls>
//                         이 브라우저에서 지원하지 않는 영상입니다.
//                     </video>
//                     <div className='sec-two-container__divide'></div>

//                     <h4 className='sec-two-container__h4'>무버 요청 사항</h4>
//                     <p className='paragraph sec-two-container__paragraph'>{apply.f_req_desc}</p>
//                 </div>

//                 {/* [S] 견적서 */}
//                 <div className='sec-two-two-container inner__section'>
//                     {/* [S] 확정된 견적서 */}
//                     <h2 className='left-align'>확정된 견적서</h2>
//                     <SuggestionBlock apply={apply} reqLocation='1' />

//                     <p>sec-two-one-container</p>
//                 </div>
//             </section>

//             <Footer />
//         </div>
//     );
// }
