import React from 'react';
import classes from './StarRating.module.css'; // 위에서 정의한 CSS 클래스를 가져옵니다.

const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push(<div key={i} className={classes.star}></div>);
    }

    return <div className={classes.starRating}>{stars}</div>;
};

export default StarRating;
