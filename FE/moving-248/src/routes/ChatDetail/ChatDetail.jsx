import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faVideo } from '@fortawesome/free-solid-svg-icons';
import './ChatDetail.css';
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberIdAtom, memberNameAtom } from '../../atom';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
export default function ChatDetail() {
    // const [messages, setMessages] = useState([]);
    const memberId = useRecoilValue(memberIdAtom);
    const memberName = useRecoilValue(memberNameAtom);

    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    const { p_id, u_id, m_id, name, roomId, profile_url } = useParams();

    // const myId = u_id;
    const today = new Date().setHours(0, 0, 0, 0);
    const [data, setData] = useState([]);
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);

    let dlength = 0;

    const scrollRef = useRef();

    useEffect(() => {
        const handleResize = () => {
            window.resizeTo(480, 920);
            window.screenLeft = 500;
            window.screenTop = 0;
        };
        firstGetData();

        // resize 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 unmount될 때 resize 이벤트 리스너 해제
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // 컴포넌트가 마운트되면 getData 함수를 5초마다 호출하는 interval을 시작
        const interval = setInterval(() => {
            getData();
        }, 1000);
        // 컴포넌트가 언마운트될 때 interval을 정리(cleanup)
        return () => clearInterval(interval);
    }, []);

    const getData = async () => {
        try {
            console.log('testst');
            const response = await axios.get(`https://i9b301.p.ssafy.io/api/chat/message/${p_id}/${u_id}/${m_id}`); // GET 요청을 보냄
            console.log(response);

            await setData(response.data.data);
            // }

            if (response.data.data.length > dlength) {
                console.log(response.data.data.length + 'reslength');
                console.log(dlength + 'reslength2');

                // setDlength(response.data.data.length);
                dlength = response.data.data.length;
                await setTimeout(scrollToBottom, 10);
            }
            if (response.data.data.length != 0) {
                setShowWelcomeMessage(false);
            }
            // console.log(response.data.data.length + ' : datalength');
            // setAddData(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // useEffect(() => {
    //     scrollToBottom();
    //     console.log(dlength + 'scrolleffect');
    // }, [data]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const firstGetData = async () => {
        try {
            const response = await axios.get(`https://i9b301.p.ssafy.io/api/chat/message/${p_id}/${u_id}/${m_id}`); // GET 요청을 보냄
            console.log(response);
            await setData(response.data.data); // 받아온 데이터를 상태에 저장
            // setDlength(responseData.data.data.length);
            dlength = response.data.data.length;
            await setTimeout(scrollToBottom, 10);
            if (response.data.data.length != 0) {
                setShowWelcomeMessage(false);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const ChatMessageLeft = ({ name, text, date }) => {
        return (
            <div className='messagesLeft'>
                {/* <strong className='userName'>{name} </strong> */}
                <div className='test'>
                    <span className='text' dangerouslySetInnerHTML={{ __html: text }} />
                </div>
                <span className='dateLeft'>
                    <p className='dateLeftDiv sub'>{date}</p>
                </span>
            </div>
        );
    };

    const ChatMessage = ({ name, text, date }) => {
        return (
            <div className='messages'>
                <span className='date'>
                    <div className='dateDiv sub'>{date}</div>
                </span>
                <div className='test'>
                    <span className='text' dangerouslySetInnerHTML={{ __html: text }} />

                    {/* <strong>{name}: </strong> */}
                </div>
            </div>
        );
    };

    return (
        <div className='ro'>
            <Helmet>
                <title>248 | 채팅</title>
            </Helmet>
            {/* <Header /> */}
            {/* <FontAwesomeIcon icon={faSearch} className='search' /> */}
            <h2 className='hea'>248메신저</h2>
            <div className='member'>
                <div className='imgName'>
                    {profile_url !== 'mover' ? (
                        <img src={`https://yeonybucket.s3.ap-northeast-2.amazonaws.com/file/${profile_url}`} className='profile_urlImg' alt='profile_img'></img>
                    ) : (
                        <img src={require(`../../assets/image/profile/${u_id % 10}.jpg`)} alt='img' className='profile_urlImg'></img>
                    )}
                    <h4 className='memberName'>{name}</h4>
                </div>

                <button
                    className='btn_close'
                    onClick={() => {
                        window.close();
                    }}
                >
                    대화방 나가기
                </button>
            </div>
            <div className='chat-box' ref={scrollRef}>
                {showWelcomeMessage && <div className='startChatMsg'>여러분의 행복한 이사에 함께합니다.</div>}
                {data.map((item, index) =>
                    item.m_id == memberId ? (
                        <div className='chat-messagesRight' key={index}>
                            {/* <div className='messageBoxs'> */}
                            {Date.parse(item.c_write_date) < today ? (
                                <ChatMessage className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(5, 5)} />
                            ) : (
                                <ChatMessage className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(11, 5)} />
                            )}
                            {/* </div> */}
                            {/* {messages.map((message, index) => (
                        ))} */}
                        </div>
                    ) : (
                        <div className='chat-messages' key={index}>
                            {Date.parse(item.c_write_date) < today ? (
                                <ChatMessageLeft className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(5, 5)} />
                            ) : (
                                <ChatMessageLeft className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(11, 5)} />
                            )}
                            {/* {messages.map((message, index) => (
                            ))} */}
                        </div>
                    )
                )}
            </div>

            <ChatInput myId={memberId} p_id={p_id} u_id={u_id} m_id={m_id} roomId={roomId} name={memberName} />
        </div>
    );
}
const ChatInput = ({ p_id, u_id, myId, roomId, name }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (message.trim() !== '') {
            console.log(message);

            axios
                .post(`https://i9b301.p.ssafy.io/api/chat/message/${p_id}/${u_id}`, {
                    m_id: myId,
                    message: message,
                })
                .then(response => {
                    // setMessage(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
            setMessage('');
        }
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter 키의 기본 동작을 막습니다.
            handleSubmit(e);
        }
    };
    return (
        // ref={el => (this.myFormRef = el)}
        <div className='chat-input-outer'>
            <div onSubmit={handleSubmit} className='chat-input '>
                <div className='input-text-outer'>
                    <textarea
                        className='inputText'
                        placeholder='메시지를 입력하세요'
                        onKeyDown={handleKeyDown}
                        rows='10'
                        cols='50'
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    ></textarea>
                </div>
                <div className='sendCam'>
                    <FontAwesomeIcon className='send-cam-icon' onClick={handleSubmit} icon={faPaperPlane} style={{ color: '#f1ebd6' }} />

                    <FontAwesomeIcon
                        className='send-cam-icon'
                        icon={faVideo}
                        style={{ color: '#f1ebd6' }}
                        onClick={() => {
                            const koreanName = name;
                            const encodedText = encodeURIComponent(koreanName);

                            console.log('sessionstorage 저장');
                            window.open(`https://i9b301.p.ssafy.io/api2/?name=${encodedText}&roomId=${p_id}` + `a` + `${u_id}`, '_blank', 'width=1000, height=1000');
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
