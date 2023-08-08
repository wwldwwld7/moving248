import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import MoverMyPageDetail from '../../components/MyPage/MoverMyPageDetail';
import MoverMyPageHistory from '../../components/MyPage/MoverMyPageHistory';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/header/Header';
import ImgBox from '../../components/ImgBox/ImgBox';

const MoverMyPage = props => {
    return (
        <>
         <Header />
            <ImgBox imgSrc='moving-box' imgTitle='무버 마이페이지' />
            <section className='max-container section'>
                <MoverMyPageDetail />
                <MoverMyPageHistory />
            </section>
            <Footer />

        </>
    );
};

export default MoverMyPage;
