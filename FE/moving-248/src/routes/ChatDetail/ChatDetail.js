import Header from '../../components/header/Header.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faVideo, faUser } from '@fortawesome/free-solid-svg-icons';
import './ChatDetail.css';
import React, { useState, useEffect, useRef, isTyping } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberEmailAtom, memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';

import axios from 'axios';
export default function ChatDetail() {
    // const [messages, setMessages] = useState([]);

    const memberName = useRecoilValue(memberNameAtom); // 값 가져오기
    const memberEmail = useRecoilValue(memberEmailAtom);
    // const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const { p_id, u_id, m_id, name, roomId } = useParams();
    const myId = u_id;
    const today = new Date().setHours(0, 0, 0, 0);
    const [data, setData] = useState([]);
    // const [dlength, setDlength] = useState(0);

    let dlength = 0;
    // const [myData, setMyData] = useState([]);
    // const [addData, setAddData] = useState([]); //2번째 부터 여기다가 데이터 저장

    // let checkMsg = 0;
    const scrollRef = useRef();

    // useEffect(() => {
    //     scrollToBottom();
    // }, dlength);

    // const scrollToBottom = () => {
    //     this.scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };
    // const [memberType, setMemberType] = useState();
    // const handleMessageSubmit = message => {
    //     setMessages([...messages, { name: name, text: message }]);
    // };

    // var list = [
    //     {
    //         m_id: 'sss',
    //         c_message: '123',
    //     },
    //     {
    //         m_id: 'ddd',
    //         c_message: '123',
    //     },
    //     {
    //         m_id: 'sss',
    //         c_message: '123',
    //     },
    //     {
    //         m_id: 'ddd',
    //         c_message: '123',
    //     },
    //     {
    //         m_id: 'sss',
    //         c_message: '123',
    //     },
    // ];

    useEffect(() => {
        const handleResize = () => {
            window.resizeTo(500, 800);
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
            const response = await axios.get(`http://localhost:8080/chat/message/${p_id}/${u_id}/${m_id}`); // GET 요청을 보냄
            console.log(response);
            // console.log(response.data.data[0].c_message);
            // for (let index = 0; index < responses.data.data.length; index++) {
            //     if (responses.data.data[index].c_write_date > checkMsg && responses.data.data[index].m_id != myId) {
            //         setAddData(...addData, responses.data.data); // 받아온 데이터를 상태에 저장
            //         console.log(responses.data.data[index].c_write_date);
            //         console.log(Date.parse(responses.data.data[index].c_write_date));
            //     }
            await setData(response.data.data);
            // }

            if (response.data.data.length > dlength) {
                console.log(response.data.data.length + 'reslength');
                console.log(dlength + 'reslength2');

                // setDlength(response.data.data.length);
                dlength = response.data.data.length;
                await setTimeout(scrollToBottom, 10);
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
            const response = await axios.get(`http://localhost:8080/chat/message/${p_id}/${u_id}/${m_id}`); // GET 요청을 보냄
            console.log(response);
            await setData(response.data.data); // 받아온 데이터를 상태에 저장
            // setDlength(responseData.data.data.length);
            dlength = response.data.data.length;
            await setTimeout(scrollToBottom, 10);
            // console.log(response.data.data[0]);
            // for (let index = 0; index < response.data.data.length; index++) {
            //     // const element = array[index];
            //     if (response.data.data[index].m_id == myId) {
            //         checkMsg = Date.parse(response.data.data[index].c_write_date);
            //         console.log(checkMsg);
            //     }
            //     // console.log(Date.parse(response.data.data[index].c_write_date) + 'test');
            // }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const ChatMessageLeft = ({ name, text, date }) => {
        return (
            <div className='messagesLeft'>
                {/* <strong className='userName'>{name} </strong> */}
                <div className='test'>
                    <span className='text'>{text}</span>
                </div>
                <span className='dateLeft'>
                    <div className='dateLeftDiv'>{date}</div>
                </span>
            </div>
        );
    };

    const ChatMessage = ({ name, text, date }) => {
        return (
            <div className='messages'>
                <span className='date'>
                    <div className='dateDiv'>{date}</div>
                </span>
                <div className='test'>
                    <span className='text'>{text}</span>

                    {/* <strong>{name}: </strong> */}
                </div>
            </div>
        );
    };

    return (
        <div className='ro'>
            {/* <Header /> */}
            {/* <FontAwesomeIcon icon={faSearch} className='search' /> */}
            <h2 className='hea'>248메신저</h2>
            <div className='member'>
                <div className='profileBox'>
                    <div className='circle'>
                        <FontAwesomeIcon className='userimg' icon={faUser} style={{ color: '#f1ebd6' }} />
                    </div>
                </div>
                <h4 className='memberName'>{name}</h4>
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
            <div className='chat-box' ref={scrollRef}>
                {data.map((item, index) =>
                    item.m_id == myId ? (
                        <div className='chat-messagesRight' key={index}>
                            <div className='messageBoxs'>
                                {item.c_write_date >= today ? (
                                    <ChatMessage className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(11, 15)} />
                                ) : (
                                    <ChatMessage className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(11, 15)} />
                                )}
                            </div>
                            {/* {messages.map((message, index) => (
                        ))} */}
                        </div>
                    ) : (
                        <div className='chat-messages' key={index}>
                            {item.c_write_date >= today ? (
                                <ChatMessageLeft className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(11, 15)} />
                            ) : (
                                <ChatMessageLeft className='chatMessage' key={index} name={item.m_id} text={item.c_message} date={item.c_write_date.substr(11, 15)} />
                            )}
                            {/* {messages.map((message, index) => (
                            ))} */}
                        </div>
                    )
                )}
            </div>

            <ChatInput myId={myId} p_id={p_id} u_id={u_id} m_id={m_id} roomId={roomId} name={name} />
        </div>
    );
}
const ChatInput = ({ p_id, u_id, myId, roomId, name }) => {
    const [message, setMessage] = useState('');
    // const [formData, setFormData] = useState({
    //     m_id: '',
    //     c_message: '',
    //     c_write_date: '',
    // });
    // const chatContainerRef = useRef(null); // 채팅 컨테이너를 참조하기 위한 useRef

    const handleSubmit = e => {
        // let today = new Date();
        // let year = today.getFullYear();
        // let month = today.getMonth() + 1;
        // let date = today.getDate(); // 일
        // let hours = today.getHours();
        // let minutes = today.getMinutes();
        // let seconds = today.getSeconds();

        // const Msgdate = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;

        // console.log(Msgdate + 'submit');

        e.preventDefault();
        // checkMsg = Date.parse(Msgdate);
        // console.log(checkMsg + 'submit');
        // if (chatContainerRef.current) {
        //     chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        // }
        if (message.trim() !== '') {
            console.log(message);
            // const newMessage = [
            //     {
            //         m_id: myId,
            //         c_message: message,
            //         c_write_date: Msgdate,
            //     },
            // ];
            // setFormData();
            // ChatMessageLeft(name, message, date);
            // onMessageSubmit(message);
            // setMyData(...myData, newMessage);
            // console.log(myData[0]);

            axios
                .post(`http://localhost:8080/chat/message/${p_id}/${u_id}`, {
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
                        window.open(`http://localhost:3001/?name=${name}&roomId=${roomId}`, '_blank', 'width=1000, height=1000');
                    }}
                />
            </div>
        </form>
    );
};
