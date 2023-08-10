import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import PartnerMyPageDetail from '../../components/MyPage/PartnerMyPageDetail';
import Header from '../../components/header/Header';
import ImgBox from '../../components/ImgBox/ImgBox';

const PartnerMyPage = props => {
    return (
        <>
            <Header />
            <ImgBox imgSrc='moving-box' imgTitle='파트너 마이페이지' />
            <section className='max-container section'>
                <PartnerMyPageDetail />
            </section>
        </>
    );
};

export default PartnerMyPage;
