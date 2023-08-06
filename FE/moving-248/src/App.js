import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';

import ChatList from './routes/ChatList/ChatList';
import ChatDetail from './routes/ChatDetail/ChatDetail';
import Login from './routes/Login/Login';
import MoverSignUp from './routes/SignUp/MoverSignUp';
import PartnerSignUp from './routes/SignUp/PartnerSignUp';
import ApplyList from './routes/ApplyList/ApplyList';
import ApplyDetail from './routes/ApplyDetail/ApplyDetail';
import MoverMyPage from './routes/MyPage/MoverMyPage';
import PartnerMyPage from './routes/MyPage/PartnerMyPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* 정적 url 사용 */}
                <Route path='/' element={<Home />} />
                <Route path='/chat-list' element={<ChatList />} />
                <Route path='/chat-list/chat-detail' element={<ChatDetail />} />

                <Route path='/login' element={<Login />} />
                <Route path='/mover-sign-up' element={<MoverSignUp />} />
                <Route path='/partner-sign-up' element={<PartnerSignUp />} />
                <Route path='/apply-list' element={<ApplyList />} />
                <Route path='/apply-detail' element={<ApplyDetail />} />
                <Route path='/mover-my-page' element={<MoverMyPage />} />
                <Route path='/partner-my-page' element={<PartnerMyPage />} />

                {/* 동적 url 사용 */}
                {/* <Route path='/movie/:id' element={<Detail />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
