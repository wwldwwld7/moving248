import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import ChatList from './routes/ChatList/ChatList';
import ChatDetail from './routes/ChatDetail/ChatDetail';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 정적 url 사용 */}
                <Route path='/' element={<Home />} />
                <Route path='/chat-list' element={<ChatList />} />
                <Route path='/chat-list/chat-detail' element={<ChatDetail />} />

                {/* 동적 url 사용 */}
                {/* <Route path='/movie/:id' element={<Detail />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
