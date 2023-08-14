import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import ApplyList from '../../components/ApplyList/ApplyList';
import ImgBox from '../../components/ImgBox/ImgBox';

export default function ApplyListPage() {
    return (
        <div>
            <ImgBox imgSrc='moving-box' imgTitle='신청서 목록' />

            <ApplyList />
        </div>
    );
}
