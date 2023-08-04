import { useEffect, useState } from 'react';
import './ImgBox.css';

export default function ImgBox({ imgSrc = 'move', imgTitle = '22' }) {
    return (
        <div className='imgbox'>
            <img className='imgbox__img' src={require(`../../assets/image/${imgSrc}.jpg`)} alt='ImgBox' />
            <h1 className='imgbox__h1'>{imgTitle}</h1>
        </div>
    );
}
