import './ChatList.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberTypeAtom } from '../../atom';
import { Helmet } from 'react-helmet-async';

export default function ChatList() {
    const today = new Date().setHours(0, 0, 0, 0);

    const member_type = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

    const [data, setData] = useState([]);

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

        getData();

        // 컴포넌트가 unmount될 때 resize 이벤트 리스너 해제
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getData = async () => {
        if (member_type == 'u') {
            // GET 요청 보내기
            await axios
                .get(`https://i9b301.p.ssafy.io/api/chat/user/${memberId}`)
                .then(response => {
                    setData(response.data.data);

                    console.log('sadfsadfsadfsd');
                    if (response.data.data.length == 0) {
                        setShowWelcomeMessage(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        //p인경우 /chat/partner/{p_id}로 get요청
        else {
            axios
                .get(`https://i9b301.p.ssafy.io/api/chat/partner/${memberId}`)
                .then(response => {
                    setData(response.data.data);
                    if (response.data.data.length == 0) {
                        setShowWelcomeMessage(true);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };

    return (
        <div className='rot'>
            <Helmet>
                <title>248 | 채팅 메신저</title>
            </Helmet>
            <h2 className='head'>248 메신저</h2>

            <div className='inner-rot'>
                <div className='sec-rot-container__divide'></div>
                {showWelcomeMessage && <div className='startChatMsgList'>여러분의 행복한 이사에 함께합니다.</div>}
                {data.map(item => (
                    <div>
                        <div
                            className='profileList'
                            key={item.room_id}
                            onClick={() => {
                                let url = '';
                                if (item.profile_url != null) {
                                    url = item.profile_url.split('https://yeonybucket.s3.ap-northeast-2.amazonaws.com/file/')[1];
                                } else {
                                    url = 'mover';
                                }
                                // 내가 누군지 확인해서 p_id, u_id,m_id 순으로 요청해서 보내기 순서 주의!!!!
                                if (member_type === 'p') {
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
                            <div className='inner-profile-list'>
                                {item.profile_url == null ? (
                                    <img src={require(`../../assets/image/profile/${item.m_id % 10}.jpg`)} alt='img' className='profile_img'></img>
                                ) : (
                                    <img src={item.profile_url} className='profile_img' alt='profile_img'></img>
                                )}
                            </div>
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
                                    <div className='lastMassage paragraph'>{item.room_last_message.length > 25 ? `${item.room_last_message.slice(0, 25)}...` : item.room_last_message}</div>
                                    {item.noread_message && <div className='dot' style={{ width: '14px', height: '14px' }}></div>}
                                </div>
                            </div>
                        </div>
                        <div className='sec-rot-container__divide'></div>
                    </div>
                ))}
            </div>
            {/* [E] div rot */}
        </div>
    );
}
