import React from 'react';
import './PartnerReview.css';
import StarRating from '../UI/StarRating';

const PartnerReview = ({ name, rating, date, content }) => (
    <div className='partner-mypage-review'>
        <div className='partner-mypage-review-header'>
            <div className='partner-mypage-review-name'>{name}</div>
            <div className='partner-mypage-review-rating'>
                <div className='partner-mypage-review-rating-text'>평점:</div>
                <StarRating rating={rating} />
            </div>
            <div className='partner-mypage-review-date'>작성일: {date}</div>
        </div>
        <div className='partner-mypage-review-content'>{content}</div>
    </div>
);

export default PartnerReview;
