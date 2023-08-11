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
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';
import ApplyForm from './routes/ApplyForm/ApplyForm';
import ScrollToTop from './routes/ScrollTop/ScrollTop';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Header />
            <Routes>
                {/* 정적 url 사용 */}
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/chat-list' element={<ChatList />} />
                <Route path='/chat-list/chat-detail' element={<ChatDetail />} />

                <Route path='/mover-sign-up' element={<MoverSignUp />} />
                <Route path='/apply-form' element={<ApplyForm />} />

                <Route path='/partner-sign-up' element={<PartnerSignUp />} />
                <Route path='/apply-list' element={<ApplyList />} />

                {/* 동적 url 사용 */}
                <Route path='/apply-detail/:id' element={<ApplyDetail />} />
                <Route path='/mover-my-page/:id' element={<MoverMyPage />} />
                <Route path='/partner-my-page/:id' element={<PartnerMyPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
