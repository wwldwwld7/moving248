import React from 'react';
import './PartnerReview.css';
import StarRating from '../UI/StarRating';

const PartnerReview = ({ name, rating, date, content }) => (
    <div className='suggestion-block history-suggestion-block'>
        <div className='mypage-block__left'>
            <h5 className='sec-two-container__h4'>{name}</h5>
            <div>
                <p className='dynamic sec-two-container__paragraph'>
                    <b>일자 </b>
                    {date}
                </p>
            </div>
        </div>

        <div className='suggestion-block__content'>
            <p className='dynamic sec-two-container__paragraph'>
                <b>평점({rating}.0/5.0)&nbsp;</b>
                <div className='padding-05'></div>
                <StarRating rating={rating} />
            </p>
            <p className='dynamic sec-two-container__paragraph'>
                <b>후기</b>
            </p>
            <div>{content}</div>
        </div>
    </div>
);

export default PartnerReview;
