// import Header from '../../components/header/Header.js';
import React, { useState } from 'react';
import { Button } from '@mui/material';

export default function ChatListTest() {
    return (
        <Button
            onClick={() => {
                window.open('/chat-list', 'chat-list', '_blank, location=no, top=0, left=0, width=500, height=800, fullscreen=yes');
            }}
        >
            list창버튼
        </Button>
    );
}
