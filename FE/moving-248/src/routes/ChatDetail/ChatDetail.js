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
    const myId = 'sss';
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

    const [data, setData] = useState([]);

    useEffect(() => {
        // GET 요청 보내기
        axios
            .get('https://i9b301asddasd/data')
            .then(response => {
                // 받은 데이터를 상태로 설정
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

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
            {data.map((item, index) =>
                item.m_id === { myId } ? (
                    <div className='chat-box'>
                        <div className='chat-messages'>
                            <div className='messageBoxs'>
                                <ChatMessage className='chatMessage' key={index} user={item.m_id} text={item.c_message} />
                            </div>
                            {/* {messages.map((message, index) => (
                        ))} */}
                        </div>
                    </div>
                ) : (
                    <div className='chat-boxLeft'>
                        <div className='chat-messages'>
                            <div className='messageBoxs'>
                                <ChatMessageLeft className='chatMessage' key={index} user={item.m_id} text={item.c_message} />
                            </div>
                            {/* {messages.map((message, index) => (
                            ))} */}
                        </div>
                    </div>
                )
            )}
            {memberType === 'm' ? (
                <div className='chat-box'>
                    <div className='chat-messages'>
                        {messages.map((message, index) => (
                            <div className='messageBoxs'>
                                <ChatMessage className='chatMessage' key={index} user={message.user} text={message.text} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className='chat-boxLeft'>
                    <div className='chat-messages'>
                        {messages.map((message, index) => (
                            <div className='messageBoxs'>
                                <ChatMessageLeft className='chatMessage' key={index} user={message.user} text={message.text} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <ChatInput onMessageSubmit={handleMessageSubmit} />
            {/* <div className='sendCam'>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    onClick={() => {
                        window.open('https://i9b301.p.ssafy.io/', '_blank', 'width=700, height=700');
                    }}
                />

                <FontAwesomeIcon
                    icon={faVideo}
                    onClick={() => {
                        window.open('https://i9b301.p.ssafy.io/', '_blank', 'width=700, height=700');
                    }}
                />
            </div> */}
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
            <span className='date'>2020.02.02</span>
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
            handleSubmit(e);

            axios
                .post('https://i9b301asddasd/chat/message/{p_id}/{u_id}')
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

// export default function ChatDetail() {
//     const [messages, setMessages] = useState([]);
//     const [inputText, setInputText] = useState('');
//     const innerRef = useRef(null);

//     const handleKeyPress = e => {
//         if (e.key === 'Enter' && inputText.trim() !== '') {
//             const newMessage = {
//                 text: inputText.trim(),
//                 time: currentTime(),
//                 class: 'your-class-name', // Replace with your custom class name
//             };
//             setMessages(prevMessages => [...prevMessages, newMessage]);
//             setInputText('');
//         }
//     };

//     const currentTime = () => {
//         const date = new Date();
//         const hh = date.getHours();
//         const mm = date.getMinutes();
//         const apm = hh >= 12 ? '오후' : '오전';
//         const ct = `${apm} ${hh}:${mm}`;
//         return ct;
//     };

//     useEffect(() => {
//         const lastItem = innerRef.current.lastChild;
//         if (lastItem) {
//             lastItem.classList.add('on');
//             const position = lastItem.offsetTop;
//             innerRef.current.scrollTop = position;
//         }
//     }, [messages]);

//     return (
//         <div className='chat_wrap'>
//             <div className='inner' ref={innerRef}>
//                 {messages.map((message, index) => (
//                     <div key={index} className={`item ${message.class}`}>
//                         <div className='box'>
//                             <p className='msg'>{message.text}</p>
//                             <span className='time'>{message.time}</span>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <input type='text' value={inputText} onChange={e => setInputText(e.target.value)} onKeyPress={handleKeyPress} placeholder='메시지를 입력하세요. 채팅 박스 크기가 자동으로 조절됩니다.' />
//         </div>
//     );
// }
