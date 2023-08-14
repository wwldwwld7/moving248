import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberActiveApplyAtom, memberEmailAtom, memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    // const memberName = useRecoilValue(memberNameAtom); // 값 가져오기
    // const memberEmail = useRecoilValue(memberEmailAtom);
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const memberActiveApply = useRecoilValue(memberActiveApplyAtom);

    const settermemberName = useSetRecoilState(memberNameAtom); // react setState와 동일하게 동작함
    const settermemberEmail = useSetRecoilState(memberEmailAtom); // react setState와 동일하게 동작함
    const settermemberType = useSetRecoilState(memberTypeAtom); // react setState와 동일하게 동작함
    const settermemberId = useSetRecoilState(memberIdAtom); // react setState와 동일하게 동작함
    const setterActiveApply = useSetRecoilState(memberActiveApplyAtom); // react setState와 동일하게 동작함

    // const [userId, setUserId] = useState('s'); // userId
    // const [userCategory, setUserCategory] = useState(''); // user 분류
    const [isactiveApply, setIsActiveApply] = useState('f'); // 활성화된 신청서 주소
    const [btntxt, setBtntxt] = useState('시작하기');
    const [btnUrl, setBtnUrl] = useState('/login'); // 버튼이 이동할 주소
    // let noReadMsg = 0;
    const [noReadMsg, setNoReadMsg] = useState(0);

    useEffect(() => {
        // 로그인이 되어 있다면
        if (memberId !== '') {
            console.log(memberId);
            console.log(memberType);

            // 무버라면
            if (memberType === 'u') {
                axios
                    .all([axios.get(`/form/user/${memberId}`), axios.get(`http://localhost:8080/chat/user/${memberId}`)])
                    .then(
                        axios.spread((res, res2) => {
                            // console.log(res.data.data);
                            // console.log(typeof res.data.data);
                            // res.data는 받아온 데이터의 배열

                            console.log('--------------------', res.data.is_form_empty);

                            console.log('[header] res.data.is_form_empty : ' + res.data.is_form_empty);
                            console.log('[header] memberActiveApply : ' + memberActiveApply);

                            if (memberActiveApply !== 0) {
                                console.log('신청서 보기');

                                setBtntxt('신청서 보기');
                                setterActiveApply(res.data.is_form_empty);
                                setBtnUrl(`/apply-detail/${memberActiveApply}`);
                                setIsActiveApply('t');
                            } else {
                                console.log('신청서 작성');
                                // 현재 진행중인 이사가 없다면
                                setBtntxt('신청서 작성');
                                setBtnUrl('/apply-form');
                            }

                            for (let index = 0; index < res2.data.data.length; index++) {
                                console.log(res2.data.data[index].noread_message + '12121212121212121');
                                if (res2.data.data[index].noread_message === true) {
                                    // noReadMsg++;
                                    setNoReadMsg(1);
                                    break;
                                }
                            }

                            // res.data.data.forEach(item => {
                            //     if (item.f_status !== 3) {
                            //         setBtntxt('신청서 보기');
                            //         setterActiveApply(item.f_id);
                            //         setBtnUrl(`/apply-detail/${memberActiveApply}`);
                            //         setIsActiveApply('t');
                            //     }
                            // });
                        })
                    )
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
            // 파트너라면
            else {
                setBtntxt('견적 리스트');
                setBtnUrl('/apply-list');
                axios
                    .get(`http://localhost:8080/chat/partner/${memberId}`)
                    .then(response => {
                        for (let index = 0; index < response.data.data.length; index++) {
                            console.log(response.data.data[index].noread_message + '12121212121212121');
                            if (response.data.data[index].noread_message === true) {
                                // noReadMsg++;
                                setNoReadMsg(1);
                                break;
                            }
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }
        }
        // 로그인이 되어 있지 않다면
        else {
            setBtntxt('시작하기');
            setBtnUrl('/login');
        }
    }, [memberId, isactiveApply, memberType, memberActiveApply, setterActiveApply, noReadMsg]);

    const navigate = useNavigate();

    const handleClick = () => {
        // console.log('btn url = ' + btnUrl);
        navigate(btnUrl);
    };

    const handleLogout = () => {
        const confirmed = window.confirm('로그아웃 하시겠습니까?');
        if (confirmed) {
            // 확인 버튼을 눌렀을 때 수행할 작업
            localStorage.removeItem('accessToken');
            document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            settermemberName('');
            settermemberEmail('');
            settermemberType('');
            settermemberId('');

            navigate('/');
        }
    };
    const handleChatList = () => {
        window.open('/chat-list', 'chat-list', '_blank, location=no, top=0, left=0, width=480, height=920, fullscreen=yes');
    };

    return (
        <header>
            <div className='header'>
                <div className='header__inner'>
                    <div className='header__logo'>
                        <Link to={`/`}>
                            <img className='header__logo__img' src={process.env.PUBLIC_URL + '/logo-text-color.png'} alt='logo' />
                        </Link>
                    </div>
                    {/* 로그인 했을 때 */}
                    {memberId !== '' ? (
                        <ul className='header__menu'>
                            {noReadMsg > 0 && <span className='header__message__info'></span>}
                            <li className='header__menu__item'>
                                {memberType === 'u' ? (
                                    <Link to={`/mover-my-page/${memberId}`}>
                                        <FontAwesomeIcon className='header__icon' icon={faUser} />
                                    </Link>
                                ) : (
                                    <Link to={`/partner-my-page/${memberId}`}>
                                        <FontAwesomeIcon className='header__icon' icon={faUser} />
                                    </Link>
                                )}
                            </li>
                            <li className='header__menu__item'>
                                <Link to={`#`}>
                                    <FontAwesomeIcon className='header__icon' icon={faEnvelopeOpenText} onClick={() => handleChatList()} />
                                </Link>
                            </li>
                            <li className='header__menu__item'>
                                {/* <Link to={`#`}> */}
                                <FontAwesomeIcon className='header__icon' icon={faRightFromBracket} onClick={() => handleLogout()} />
                                {/* </Link> */}
                            </li>

                            <button className='header__button' onClick={() => handleClick()}>
                                {btntxt}
                            </button>
                        </ul>
                    ) : (
                        <button className='header__button' onClick={() => handleClick()}>
                            {btntxt}
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
