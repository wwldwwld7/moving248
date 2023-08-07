import Header from '../../components/header/Header.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faVideo, faUser } from '@fortawesome/free-solid-svg-icons';
import './ChatDetail.css';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
export default function ChatDetail() {
    const [messages, setMessages] = useState([]);
    // const [memberType, setMemberType] = useState();
    const handleMessageSubmit = message => {
        setMessages([...messages, { user: '이사왕김이사', text: message }]);
    };
    var list = [
        {
            m_id: 'sss',
            c_message: '123',
        },
        {
            m_id: 'ddd',
            c_message: '123',
        },
        {
            m_id: 'sss',
            c_message: '123',
        },
        {
            m_id: 'ddd',
            c_message: '123',
        },
        {
            m_id: 'sss',
            c_message: '123',
        },
    ];
    const myId = 'sss';
    const p_id = 'sss';
    const u_id = 'sss';
    const m_id = 'sss';

    const memberType = 'p';
    useEffect(() => {
        const handleResize = () => {
            // 원하는 창 크기로 고정 (예시: 800x600)
            window.resizeTo(500, 800);
        };

        // resize 이벤트 리스너 등록
        window.addEventListener('resize', handleResize);

        // 컴포넌트가 unmount될 때 resize 이벤트 리스너 해제
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [data, setData] = useState();

    useEffect(() => {
        // 컴포넌트가 마운트되면 getData 함수를 5초마다 호출하는 interval을 시작
        const interval = setInterval(getData, 5000);

        // 컴포넌트가 언마운트될 때 interval을 정리(cleanup)
        return () => clearInterval(interval);
    }, []);

    const getData = async () => {
        try {
            const response = await axios.get(`https://i9b301.p.ssafy.io:8080/chat/message/${p_id}/${u_id}/${m_id}`); // GET 요청을 보냄
            setData(response.data); // 받아온 데이터를 상태에 저장
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='ro'>
            {/* <Header /> */}
            {/* <FontAwesomeIcon icon={faSearch} className='search' /> */}
            <h2 className='hea'>248 메신저</h2>
            <div className='member'>
                <div className='profileBox'>
                    <div className='circle'>
                        <FontAwesomeIcon className='userimg' icon={faUser} style={{ color: '#f1ebd6' }} />
                    </div>
                </div>
                <h4 className='memberName'>이사왕김이사</h4>
                {/* </div> */}

                <button
                    className='btn_close'
                    onClick={() => {
                        window.close();
                    }}
                >
                    대화방 나가기
                </button>
            </div>
            <div className='chat-box'>
                {list.map((item, index) =>
                    item.m_id === myId ? (
                        <div className='chat-messagesRight'>
                            <div className='messageBoxs'>
                                <ChatMessage className='chatMessage' key={index} user={item.m_id} text={item.c_message} />
                            </div>
                            {/* {messages.map((message, index) => (
                        ))} */}
                        </div>
                    ) : (
                        <div className='chat-messages'>
                            <div className='messageBoxs'>
                                <ChatMessageLeft className='chatMessage' key={index} user={item.m_id} text={item.c_message} />
                            </div>
                            {/* {messages.map((message, index) => (
                            ))} */}
                        </div>
                    )
                )}
            </div>

            <ChatInput onMessageSubmit={handleMessageSubmit} />
        </div>
    );
}
const ChatMessageLeft = ({ user, text }) => {
    return (
        <div className='messagesLeft'>
            {/* <strong className='userName'>{user} </strong> */}
            <div className='test'>
                <span className='text'>{text}</span>
            </div>
            <span className='dateLeft'>
                <div className='dateLeftDiv'>2020.02.02</div>
            </span>
        </div>
    );
};

const ChatMessage = ({ user, text }) => {
    return (
        <div className='messages'>
            <span className='date'>
                <div className='dateDiv'>2020.02.02</div>
            </span>
            <div className='test'>
                <span className='text'>{text}</span>

                {/* <strong>{user}: </strong> */}
            </div>
        </div>
    );
};

const ChatInput = ({ onMessageSubmit }) => {
    const [message, setMessage] = useState('');
    // const [formData, setFormData] = useState({
    //     m_id: '',
    //     message: '',
    //   });
    const chatContainerRef = useRef(null); // 채팅 컨테이너를 참조하기 위한 useRef

    const handleSubmit = e => {
        e.preventDefault();
        if (message.trim() !== '') {
            onMessageSubmit(message);
            setMessage('');
        }
    };
    // useEffect(() => {
    //     // 메시지 리스트가 업데이트될 때마다 스크롤을 아래로 내림
    //     if (chatContainerRef.current) {
    //         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //     }
    // }, [message]);
    // useEffect(() => {
    //     // GET 요청 보내기

    // }, []);
    const handleKeyDown = e => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Enter 키의 기본 동작을 막습니다.
            // handleSubmit(e);

            axios
                .post('https://localhost:8080/chat/message/{p_id}/{u_id}')
                .then(response => {
                    setMessage(response.data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    };
    return (
        // ref={el => (this.myFormRef = el)}
        <form onSubmit={handleSubmit} className='chat-input '>
            <textarea className='inputText' placeholder='메시지를 입력하세요' onKeyDown={handleKeyDown} rows='10' cols='50' value={message} onChange={e => setMessage(e.target.value)}></textarea>
            {/* <input className='inputText' type='text' placeholder='메시지를 입력하세요' value={message} onChange={e => setMessage(e.target.value)} /> */}
            <div className='sendCam'>
                <FontAwesomeIcon className='paperPlane' onClick={handleSubmit} icon={faPaperPlane} style={{ color: '#f1ebd6' }} />

                <FontAwesomeIcon
                    className='cam'
                    icon={faVideo}
                    style={{ color: '#f1ebd6' }}
                    onClick={() => {
                        window.open('https://i9b301.p.ssafy.io/', '_blank', 'width=700, height=700');
                    }}
                />
            </div>
        </form>
    );
};
