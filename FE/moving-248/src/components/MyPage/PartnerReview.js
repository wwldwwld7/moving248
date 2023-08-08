import React from 'react';
import './PartnerReview.css';

const PartnerReview = ({ name, rating, date, content }) => (
    <div className='partner-mypage-review'>
        <div className='partner-mypage-review-header'>
            <span className='partner-mypage-review-name'>{name}</span>
            <span className='partner-mypage-review-rating'>평점: {rating}</span>
            <span className='partner-mypage-review-date'>작성일: {date}</span>
        </div>
        <div className='partner-mypage-review-content'>{content}</div>
    </div>
);

export default PartnerReview;
