import Header from '../../components/header/Header.js';
import './ChatList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';

export default function ChatList() {
    //member_type 가져오고
    const member_type = 'm';
    const [data, setData] = useState([]);
    //읽음여부
    const [showDiv, setShowDiv] = useState(true);

    //m인경우 /chat/user/{u_id}로 get요청
    // useEffect(() => {
    //     if (member_type == 'm') {
    //         // GET 요청 보내기
    //         axios
    //             .get('https://i9b301.p.ssafy.io/chat/user/{u_id}')
    //             .then(response => {
    //                 setData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching data:', error);
    //             });
    //     }
    //     //p인경우 /chat/partner/{p_id}로 get요청
    //     else {
    //         axios
    //             .get('https://api.example.com/chat/partner/{p_id}')
    //             .then(response => {
    //                 setData(response.data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching data:', error);
    //             });
    //     }
    // }, []);
    //받아서 data 개수 체크 하고 그만큼 map 돌기
    const datas = [1, 2, 3, 4, 5, 6];
    const text = 'sppppppppppppppppppppppppppppppppppppppppppppppspppppsppppppppppppppppppppppppppppppppppppppppppppppspppppsppppppppppppppppppppppppppppppppppppppppppppppsppppp';
    const name = '김승용ㅇㅇㅇ';
    // if (member_type == 'u') {
    // }

    return (
        <div className='rot'>
            {/* <Header /> */}
            {/* <FontAwesomeIcon icon={faSearch} className='search' /> */}
            <h2 className='head'>248 메신저</h2>
            {/* <LineDrawing></LineDrawing> */}

            {/* <div className=''>
                {data.map(item => (
                    <div>
                        <div
                            key={item.room_id}
                            className='profileList'
                            onClick={() => {
                                window.open(`chat-list/chat-detail/`, '_blank', 'width=500, height=600');
                            }}
                        >
                            <img src={item.profile_url} className='profile_img' alt='profile_img' style={{ width: '100px', height: '100px' }}></img>
                            <div className='profile'>
                                <div className='nameDate'>
                                    <div className='name'>{item.name.length > 5 ? `${item.name.slice(0, 5)}...` : item.name}</div>

                                    <p className='sub date'>{item.room_last_date}</p>

                                </div>

                                <div className='message'>
                                    <div className='lastMassage'>
                                    {item.room_last_message.length > 100 ? `${item.room_last_message.slice(0,100)}...` : item.room_last_message }
                                    </div>
                                    {item.noread_message && <img className='dot' src='redDot.png' alt='읽음여부' style={{ width: '20px', height: '20px' }}></img>}
                                </div>
                            </div>
                        </div>
                        <MyComponent></MyComponent>
                        </div>
                ))}
            </div> */}

            <div className=''>
                {datas.map((number, index) => (
                    <div>
                        <div
                            key={index}
                            className='profileList'
                            onClick={() => {
                                window.open(`/chat-list/chat-detail`, '_blank', 'width=500, height=800');
                            }}
                        >
                            <img src='/apple.jpg' className='profile_img' alt='profile_img' style={{ width: '100px', height: '100px' }}></img>
                            <div className='profile'>
                                <div className='nameDate'>
                                    <div className='name'>{name.length > 5 ? `${name.slice(0, 5)}...` : name}</div>
                                    <p className='sub date'>2020.02.02</p>
                                </div>

                                <div className='message'>
                                    <div className='lastMassage paragraph'>{text.length > 25 ? `${text.slice(0, 25)}...` : text}</div>
                                    <div className='dot' style={{ width: '15px', height: '15px' }}></div>
                                </div>
                            </div>
                        </div>
                        {/* <LineDrawing></LineDrawing> */}
                        <MyComponent></MyComponent>
                    </div>
                ))}
            </div>

            {/* <div
                className='profileList'
                onClick={() => {
                    window.open(`chat-list/chat-detail/`, '_blank', 'width=500, height=600');
                }}
            >
                <img src='apple.jpg' className='profile_img' alt='profile_img' style={{ width: '100px', height: '100px' }}></img>
                <div className='profile'>
                    <div className='nameDate'>
                        <div class='name'>김승용</div>
                        <div class='date'>2020.2.20</div>
                    </div>

                    <div className='nameDate'>
                        <div className='lastMassage'>네네네</div>
                        <img src='redDot.png' alt='읽음여부' style={{ width: '20px', height: '20px' }}></img>
                    </div>
                </div>

                 <LineDrawing></LineDrawing> 
            </div> */}

            {/* 
            <button type='button' className='btn'>
                <Link to='./chat-detail' target='_blank'>
                    채팅가기
                </Link>
            </button> */}

            {/* <button
                type='button'
                className='item_btn purchase_btn'
                onClick={() => {
                    window.open('chat-list/chat-detail', '_blank', 'width=600, height=600');
                }}
            >
                채팅
            </button> */}

            {/* <h4>h4</h4>
            <h5>h5</h5>
            <p>그냥 p</p>
            <p className='dynamic'>p dynamic 다이내믹</p>
            <p className='paragraph'>p paragraph 파라그래프</p>
            <p className='sub'>p 서브</p> */}
        </div>
    );
}
const LineDrawing = () => {
    return (
        <div className='Line'>
            <svg width='3000' height='10'>
                <line x1='0' y1='0' x2='3000' y2='0' stroke='black' strokeWidth='1' />
            </svg>
        </div>
    );
};

const MyComponent = () => {
    const [lineHeight, setLineHeight] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            const viewportHeight = window.innerHeight;
            const newLineHeight = viewportHeight * 0.005; // 원하는 비율로 조정
            setLineHeight(newLineHeight);
        };

        // 페이지 로드 시에 한 번 호출하고 화면 크기 변경 시에도 호출
        handleResize();
        window.addEventListener('resize', handleResize);

        // 컴포넌트 언마운트 시에 이벤트 리스너 제거
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <div
                style={{
                    position: 'relative',
                    left: 50,
                    width: '85%',
                    height: 0,
                    paddingBottom: lineHeight,
                    borderTop: '2px solid black', // 직선의 선 스타일을 설정
                }}
            />
        </div>
    );
};
