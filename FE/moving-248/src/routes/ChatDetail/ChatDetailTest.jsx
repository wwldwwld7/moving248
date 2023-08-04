// import Header from '../../components/header/Header.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faVideo, faUser } from '@fortawesome/free-solid-svg-icons';
import './ChatDetail.css';
import React, { useState } from 'react';

export default function ChatDetailTest() {
    return (
        <div class='chat_wrap'>
            <div class='inner'>
                {/* <div class="item">
                <div class="box">
                    <p class="msg">안녕하세요</p>
                    <span class="time">오전 10:05</span>
                </div>
            </div>

            <div class="item mymsg">
                <div class="box">
                    <p class="msg">안녕하세요</p>
                    <span class="time">오전 10:05</span>
                </div>
            </div>  */}
            </div>

            <input type='text' class='mymsg' placeholder='내용 입력' />
            <input type='text' class='yourmsg' placeholder='내용 입력' />
        </div>
    );
}
