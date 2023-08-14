import React from 'react';
import classes from './StarRating.module.css';

const StarRating = ({ rating }) => {
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push(<p key={i} className={classes.star}></p>);
    }

    return <p className={classes.starRating}>{stars}</p>;
};

export default StarRating;
