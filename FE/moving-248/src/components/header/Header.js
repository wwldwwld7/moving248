import React from 'react';
import './Header.css';

export default function Header() {
    return (
        <header>
            <div className='header'>
                <div className='header__inner'>
                    <div className='header__logo'>
                        <img className='header__logo__img' src={process.env.PUBLIC_URL + '/logo-text-color.png'} alt='logo' />
                    </div>
                    <ul className='header__menu'>
                        <li className='header__menu__item'>hola</li>
                        <li className='header__menu__item'>hola</li>
                        <li className='header__menu__item'>hola</li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
