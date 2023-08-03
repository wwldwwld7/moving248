import { useEffect, useState } from 'react';
import './ImgBox.css';

export default function ImgBox({ imgSrc = 'move' }) {
    return (
        <div>
            <img className='imgbox__img' src={require(`../../assets/image/${imgSrc}.jpg`)} alt='ImgBox' />
        </div>
    );
}
