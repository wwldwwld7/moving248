import './Footer.css';
// import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faBlogger } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className='footer__outer'>
            <div className='max-container footer'>
                <div className='footer-two-one-container'>
                    <div>
                        <img className='footer__logo' src={process.env.PUBLIC_URL + '/logo-text-black.png'} alt='logo' />
                    </div>
                    <div>
                        <ul className='footer__menu' style={{ paddingBottom: '1rem' }}>
                            <li>
                                <a href='#!' target='_blank' className='sub'>
                                    이용약관
                                </a>
                            </li>
                            <li>
                                <a href='#!' target='_blank' className='sub'>
                                    <b>개인정보처리방침</b>
                                </a>
                            </li>
                            <li>
                                <a href='#!' target='_blank' className='sub'>
                                    위치기반서비스 이용약관
                                </a>
                            </li>
                            <li>
                                <a href='mailto:test@naver.com?subject=제휴 문의' className='sub'>
                                    제휴 문의
                                </a>
                            </li>
                            <li>
                                <a href='mailto:test@naver.com?subject=IR 문의' className='sub'>
                                    IR 문의
                                </a>
                            </li>
                        </ul>
                        <p className='sub' style={{ paddingBottom: '0.5rem' }}>
                            <b>주소</b> 대전광역시 유성구 동서대로 98-39
                        </p>
                        <p className='sub' style={{ paddingBottom: '2rem' }}>
                            <b>사업자번호</b> 123-45-67890 | <b>통신판매업 신고번호</b> 2023-대전싸피-12345호
                        </p>
                        <p className='sub' style={{ paddingBottom: '0.5rem' }}>
                            Copyright <b>Moving 248</b> Corp. LTD ALL RIGHT RESERVED.
                        </p>
                    </div>
                </div>

                <div className='footer-two-two-container'>
                    <h3 style={{ paddingBottom: '0.5rem' }}>고객센터</h3>
                    <h2 style={{ paddingBottom: '2rem' }}>
                        <a className='footer__phone' href='tel:1588-0000'>
                            1588-0000
                        </a>
                    </h2>

                    <p className='sub' style={{ paddingBottom: '0.5rem' }}>
                        <b>연중무휴 오전 9시 ~ 오후 6시</b>
                    </p>
                    <p className='sub' style={{ paddingBottom: '1rem' }}>
                        (점심시간 12:30 ~ 13:30)
                    </p>
                    <p className='sub' style={{ paddingBottom: '0.5rem' }}>
                        이사 견적은 신청서 작성을 통해서만 신청이 가능하며,
                    </p>
                    <p className='sub' style={{ paddingBottom: '2rem' }}>
                        서비스 관련 문의는 고객센터를 통해 상담부탁드립니다.
                    </p>

                    <ul className='footer__menu'>
                        <li>
                            <a href='https://angelplayer.tistory.com' target='_blank' rel='noopener noreferrer'>
                                <FontAwesomeIcon className='footer__icon' icon={faBlogger} />
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/ssh5212' target='_blank' rel='noopener noreferrer'>
                                <FontAwesomeIcon className='footer__icon' icon={faGithubSquare} />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
