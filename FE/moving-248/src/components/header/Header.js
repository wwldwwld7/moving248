import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export default function Header() {
    const [userId, setUserId] = useState('s'); // userId
    const [userCategory, setUserCategory] = useState(''); // user 분류
    const [activeApply, setActiveApply] = useState(''); // 활성화된 신청서 주소
    const [btntxt, setBtntxt] = useState('시작하기');
    const [btnUrl, setBtnUrl] = useState('/login'); // 버튼이 이동할 주소

    useEffect(() => {
        // [Need] User Id 가져오기
        console.log('[Need] render링 된 후 사용자 아이디 존재하는지 확인 필요');
        if (userId !== '') {
            // [Need] User Category 가져오기
            if (activeApply !== '') {
                setBtntxt();
            }
        }
    }, []);

    return (
        <header>
            <div className='header'>
                <div className='header__inner'>
                    <div className='header__logo'>
                        <Link to={`/`}>
                            <img className='header__logo__img' src={process.env.PUBLIC_URL + '/logo-text-color.png'} alt='logo' />
                        </Link>
                    </div>
                    {userId !== '' ? (
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
                                <Link to={`#`}>
                                    <FontAwesomeIcon className='header__icon' icon={faRightFromBracket} />
                                </Link>
                            </li>

                            <button className='header__button'>{btntxt}</button>
                        </ul>
                    ) : (
                        <ul className='header__menu'>
                            <button className='header__button'>{btntxt}</button>
                        </ul>
                    )}
                </div>
            </div>
        </header>
    );
}
