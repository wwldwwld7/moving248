import './SuggestionBlock.css';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberTypeAtom } from '../../atom';

export default function SuggestionBlock({ element, f_id }) {
    const user_status = 1; // 전역으로 사용할 것임
    // const user_id = 1; // 전역으로 사용할 것임
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);

    const renderStatusMessage = () => {
        console.log(element);
        console.log(f_id);
        //mover일 때
        if (memberType === 'u') {
            return (
                <div className='suggestion-block__btn-outer'>
                    <button className='btn-dynamic suggestion-block__btn'>문의하기</button>
                    <button className='btn-dynamic suggestion-block__btn'>확정하기</button>
                </div>
            );
        } else {
            return (
                <div className='suggestion-block__btn-outer'>
                    <button className='btn-dynamic suggestion-block__btn'>수정하기</button>
                    <button className='btn-dynamic suggestion-block__btn'>삭제하기</button>
                </div>
            );
        }

        //partner 일 때

        // Mover이고, 미확정 상태일 때
        // if (user_status === 1 && f_status === 1) {
        //     return (
        //         <div className='suggestion-block__btn-outer'>
        //             <button className='btn-dynamic suggestion-block__btn'>문의하기</button>
        //             <button className='btn-dynamic suggestion-block__btn'>확정하기</button>
        //         </div>
        //     );
        // }
        // // Mover이고, 확정 상태이고, 확정된 견적서인 경우
        // else if (user_status === 1 && f_status === 2 && element.is_selected === 't') {
        //     return (
        //         <div className='suggestion-block__btn-outer'>
        //             <button className='btn-dynamic suggestion-block__btn'>문의하기</button>
        //             <button className='btn-dynamic suggestion-block__btn'>취소하기</button>
        //         </div>
        //     );
        // }
        // // Partner이고, 본인의 글이며, 확정 상태일 때
        // else if (memberType === 'p' && element.f_id === memberId) {
        //     return (
        //         <div className='suggestion-block__btn-outer'>
        //             <button className='btn-dynamic suggestion-block__btn'>수정하기</button>
        //             <button className='btn-dynamic suggestion-block__btn'>삭제하기</button>
        //         </div>
        //     );
        // } else {
        //     return null; // 다른 조건에 해당하지 않으면 아무것도 표시하지 않음
        // }
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
                {renderStatusMessage()} {/* 조건부 렌더링 */}
            </div>
        </div>
    );
}

// import { useState } from 'react';
// import './SuggestionBlock.css';

// export default function SuggestionBlock({ apply, reqLocation }) {
//     const user_status = 1; // 전역으로 사용할 것임
//     const user_id = 1; // 전역으로 사용할 것임

//     const [suggestion, setSuggestion] = useState({
//         list: [
//             {
//                 p_id: 3,
//                 name: '이사왕김이사',
//                 profile_url: 'https://yeonybucket.s3.ap-northeast-2.amazonaws.com/image/9befd15a-ff15-4b4e-853e-d13e7aef09d00e351634-3ffe-4299-bf96-1daaaab119a2.jpg',
//                 p_move_cnt: 50,
//                 s_money: 5000000,
//                 s_desc: '이 문서는 김승용의 대단함을 알리기 위한 글이며, 어떠한 사유로도 무단으로 보관 복제 삭제하거나 제 3자에게 누설 하는 행위를 금합니다.   ㅁ',
//                 s_create_time: '2023-07-05',
//                 is_selected: 't',
//             },
//         ],
//     });

//     // const renderStatusMessage = () => {
//     //     // Mover이고, 미확정 상태일 때
//     //     if (user_status === 1 && f_status === 1) {
//     //         return (
//     //             <div>
//     //                 <button className='btn-dynamic suggestion-block__btn'>문의하기</button>
//     //                 <button className='btn-dynamic suggestion-block__btn'>확정하기</button>
//     //             </div>
//     //         );
//     //     }
//     //     // Mover이고, 확정 상태이고, 확정된 견적서인 경우
//     //     else if (user_status === 1 && f_status === 2 && element.is_selected) {
//     //         return (
//     //             <div>
//     //                 <button className='btn-dynamic suggestion-block__btn'>문의하기</button>
//     //                 <button className='btn-dynamic suggestion-block__btn'>취소하기</button>
//     //             </div>
//     //         );
//     //     }
//     //     // Partner이고, 본인의 글이며, 확정 상태일 때
//     //     else if (user_status === 2 && element.f_id === user_id && f_status === 2) {
//     //         return (
//     //             <div>
//     //                 <button className='btn-dynamic suggestion-block__btn'>문의하기</button>
//     //                 <button className='btn-dynamic suggestion-block__btn'>취소하기</button>
//     //             </div>
//     //         );
//     //     } else {
//     //         return null; // 다른 조건에 해당하지 않으면 아무것도 표시하지 않음
//     //     }
//     // };

//     return (
//         <div>
//             {reqLocation === '1' ? renderStatusMessage }
//         </div>

//         // <div className='suggestion-block'>
//         //     <img className='suggestion-block__image' src={element.profile_url} alt='img' />
//         //     <div className='suggestion-block__content'>
//         //         <h4 className='sec-two-container__h4'>{element.name}</h4>
//         //         <p className='sec-two-container__paragraph'>
//         //             <b>{element.s_money.toLocaleString()}원</b>
//         //             <span className='paragraph sec-two-container__paragraph'>
//         //                 &nbsp;&nbsp;|&nbsp;&nbsp;<b>이사 횟수</b> {element.p_move_cnt}
//         //             </span>
//         //         </p>

//         //         <p className='paragraph sec-two-container__paragraph'>{element.s_desc}</p>
//         //         <br />
//         //         <div className='suggestion-block__btn-outer'>
//         //             {renderStatusMessage()} {/* 조건부 렌더링 */}
//         //         </div>
//         //     </div>
//         // </div>
//     );
// }
