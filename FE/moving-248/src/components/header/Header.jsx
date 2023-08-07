import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { memberEmailAtom, memberIdAtom, memberNameAtom, memberTypeAtom } from '../../atom';
import { useNavigate } from 'react-router-dom';
// import { defaultInstance as api } from '../../jwt/token';

export default function Header() {
    const memberName = useRecoilValue(memberNameAtom); // 값 가져오기
    const memberEmail = useRecoilValue(memberEmailAtom);
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const settermemberName = useSetRecoilState(memberNameAtom); // react setState와 동일하게 동작함
    const settermemberEmail = useSetRecoilState(memberEmailAtom); // react setState와 동일하게 동작함
    const settermemberType = useSetRecoilState(memberTypeAtom); // react setState와 동일하게 동작함
    const settermemberId = useSetRecoilState(memberIdAtom); // react setState와 동일하게 동작함

    // const [userId, setUserId] = useState('s'); // userId
    // const [userCategory, setUserCategory] = useState(''); // user 분류
    const [isactiveApply, setIsActiveApply] = useState('f'); // 활성화된 신청서 주소
    const [btntxt, setBtntxt] = useState('시작하기');
    const [btnUrl, setBtnUrl] = useState('/login'); // 버튼이 이동할 주소

    useEffect(() => {
        // 로그인이 되어 있다면
        if (memberId !== '') {
            // 무버라면
            if (memberType === 'u') {
                const formId = '';

                axios.get('/form').then(res => {
                    console.log(res.data.data);
                    console.log(typeof res.data.data);
                    // res.data는 받아온 데이터의 배열
                    res.data.data.forEach(item => {
                        if (item.f_status !== 3) {
                            setBtntxt('신청서 보기');
                            setBtnUrl(`/apply-detail/${formId}`);
                            setIsActiveApply('t');
                        }
                    });
                });

                if (isactiveApply === 'f') {
                    // 현재 진행중인 이사가 없다면
                    setBtntxt('신청서 작성');
                    setBtnUrl('/');
                }
            }
            // 파트너라면
            else {
                setBtntxt('견적 리스트');
                setBtnUrl('/');
            }
        }
        // 로그인이 되어 있지 않다면
        else {
            setBtntxt('시작하기');
            setBtnUrl('/login');
        }
    }, [memberId, isactiveApply]);

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(btnUrl);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        settermemberName('');
        settermemberEmail('');
        settermemberType('');
        settermemberId('');
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
                            <li className='header__menu__item'>
                                <Link to={`#`}>
                                    <FontAwesomeIcon className='header__icon' icon={faUser} />
                                    {/* <FontAwesomeIcon icon="fa-regular fa-user" /> */}
                                </Link>
                            </li>
                            <li className='header__menu__item'>
                                <Link to={`#`}>
                                    <FontAwesomeIcon className='header__icon' icon={faEnvelopeOpenText} />
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
