import './App.css';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Home from './routes/Home/Home';

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
import ChatList from './routes/ChatList/ChatList';
import ChatDetail from './routes/ChatDetail/ChatDetail';
// import ChatListTest from './routes/ChatList/ChatListTest';
import ScrollToTop from './routes/ScrollTop/ScrollTop';
import PrivateRoute from './context/PrivateRoute';
function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/chat-list' element={<ChatList />} />
                    <Route path='/chat-list/chat-detail/:p_id/:u_id/:m_id/:name/:roomId/:profile_url' element={<ChatDetail />} />
                    {/* <Route path='/chatTest' element={<ChatListTest />} /> */}

                    <Route element={<MainLayout />}>
                        {/* 정적 url 사용 */}

                        <Route path='/apply-form' element={<ApplyForm />} />

                        <Route path='/apply-list' element={<ApplyList />} />

                        {/* 동적 url 사용 */}
                        <Route path='/apply-detail/:id' element={<ApplyDetail />} />
                        <Route path='/mover-my-page/:id' element={<MoverMyPage />} />
                        <Route path='/partner-my-page/:id' element={<PartnerMyPage />} />
                    </Route>
                </Route>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/mover-sign-up' element={<MoverSignUp />} />
                    <Route path='/partner-sign-up' element={<PartnerSignUp />} />
                    {/* 없는 페이지에 접근할 때 처리 */}
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const NotFound = () => {
    alert('잘못된 페이지 접근입니다.');
    return <Navigate to='/' replace />;
};

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default App;
