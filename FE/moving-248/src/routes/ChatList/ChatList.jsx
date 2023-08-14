import './ChatList.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberEmailAtom, memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';

export default function ChatList() {
    const myId = '2';
    let p_id = '1';
    let u_id = '2';
    // const member_type = 'm';
    const now = new Date();
    const today = new Date().setHours(0, 0, 0, 0);

    const memberName = useRecoilValue(memberNameAtom); // 값 가져오기
    const memberEmail = useRecoilValue(memberEmailAtom);
    const member_type = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);

    //member_type 가져오고
    // if (memberType == 'p') {
    // if (member_type == 'p') {
    //     // p_id = memberId;
    //     p_id = myId;
    // } else {
    //     // u_id = memberId;
    //     u_id = myId;
    // }

    const [data, setData] = useState([]);
    //읽음여부
    // const [showDiv, setShowDiv] = useState(true);

    //m인경우 /chat/user/{u_id}로 get요청
    useEffect(() => {
        const handleResize = () => {
            // 원하는 창 크기로 고정 (예시: 800x600)
            window.resizeTo(480, 920);
            window.screenLeft = 0;
            window.screenTop = 0;
        };

        // resize 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 unmount될 때 resize 이벤트 리스너 해제

        if (member_type == 'u') {
            // GET 요청 보내기
            axios
                .get(`http://localhost:8080/chat/user/${memberId}`)
                .then(response => {
                    setData(response.data.data);
                    // console.log(response.data.data[0].profile_url);
                    console.log(Date.parse(response.data.data[0].room_last_date));
                    console.log(today);
                    console.log(response.data.data[0].noread_message);

                    console.log('sadfsadfsadfsd');
                    // console.log(Date(response.data.data.room_last_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        //p인경우 /chat/partner/{p_id}로 get요청
        else {
            axios
                .get(`http://localhost:8080/chat/partner/${memberId}`)
                .then(response => {
                    setData(response.data.data);
                    // date = new Date(response.data.data);
                    console.log(response.data.data[0]);
                    console.log(Date.parse(today));
                    console.log('memberType : p');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    let formattedDateTime;

    // if (now.getTime() >= today) {
    //     // If current date is today
    //     formattedDateTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    // } else {
    //     // If current date is not today
    //     formattedDateTime = now.toLocaleDateString();
    // }

    // console.log(formattedDateTime);

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

            <div className=''>
                {data.map(item => (
                    <div>
                        <div
                            key={item.room_id}
                            className='profileList'
                            onClick={() => {
                                let url = '';
                                if (item.profile_url != null) {
                                    url = item.profile_url.split('https://yeonybucket.s3.ap-northeast-2.amazonaws.com/file/')[1];
                                } else {
                                    url = 'mover';
                                }
                                // 내가 누군지 확인해서 p_id, u_id,m_id 순으로 요청해서 보내기 순서 주의!!!!
                                if (member_type == 'p') {
                                    window.open(
                                        `chat-list/chat-detail/${memberId}/${item.m_id}/${memberId}/${item.name}/${item.room_id}/${url}`,
                                        `chat-detail${item.room_id}`,
                                        '_blank, left =500,top=0,  width=480, height=920, resizable=no'
                                    );
                                } else {
                                    window.open(
                                        `chat-list/chat-detail/${item.m_id}/${memberId}/${memberId}/${item.name}/${item.room_id}/${url}`,
                                        `chat-detail${item.room_id}`,
                                        '_blank,left =500,top=0, width=480, height=920, resizable=no'
                                    );
                                }
                            }}
                        >
                            {/* <img src={item.profile_url} className='profile_img' alt='profile_img' style={{ width: '100px', height: '100px' }}></img> */}
                            {item.profile_url == null ? (
                                <img src={require(`../../assets/image/profile/${item.m_id % 10}.jpg`)} alt='img' className='profile_img' style={{ width: '100px', height: '100px' }}></img>
                            ) : (
                                <img src={item.profile_url} className='profile_img' alt='profile_img' style={{ width: '100px', height: '100px' }}></img>
                            )}
                            <div className='profile'>
                                <div className='nameDate'>
                                    <div className='name'>{item.name.length > 8 ? `${item.name.slice(0, 8)}...` : item.name}</div>
                                    {/* <p className='sub date'>{item.room_last_date}</p> */}
                                    {Date.parse(item.room_last_date) < today ? (
                                        <p className='sub last_date'>{item.room_last_date.substr(2, 8)}</p>
                                    ) : (
                                        <p className='sub last_date'>{item.room_last_date.substr(11, 5)}</p>
                                    )}
                                </div>

                                <div className='chat__message'>
                                    <div className='lastMassage paragraph'>{item.room_last_message.length > 13 ? `${item.room_last_message.slice(0, 13)}...` : item.room_last_message}</div>
                                    {item.noread_message && <div className='dot' style={{ width: '12px', height: '12px' }}></div>}
                                </div>
                            </div>
                        </div>
                        <MyComponent></MyComponent>
                    </div>
                ))}
            </div>

            {/* <div className=''>
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

                                <div className='chat__message'>
                                    <div className='lastMassage paragraph'>{text.length > 25 ? `${text.slice(0, 25)}...` : text}</div>
                                    <div className='dot' style={{ width: '15px', height: '15px' }}></div>
                                </div>
                            </div>
                        </div>
                        
                        <MyComponent></MyComponent>
                    </div>
                ))}
            </div> */}

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
        <div className='Linecontainer'>
            <div
                style={{
                    position: 'relative',
                    left: 40,
                    width: '100%',
                    height: 0,
                    paddingBottom: lineHeight,
                    borderTop: '2px solid black', // 직선의 선 스타일을 설정
                }}
            />
        </div>
    );
};
