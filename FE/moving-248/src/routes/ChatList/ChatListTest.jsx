import React, { useState } from 'react';

export default function ChatListTest() {
    return (
        <button
            onClick={() => {
                window.open('/chat-list', 'chat-list', '_blank, location=no, top=0, left=0, width=480, height=920, fullscreen=yes');
            }}
        >
            list창버튼
        </button>
    );
}
