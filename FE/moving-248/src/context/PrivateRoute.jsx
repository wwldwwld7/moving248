import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberIdAtom } from '../atom';

export default function PrivateRoute() {
    // const memberEmail = useRecoilValue(memberEmailAtom);
    // const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const location = useLocation();

    console.log(location);
    // 로그인 유저는 모든 페이지 접근 가능
    if (memberId !== '') {
        return <Outlet />;
    }

    // 미로그인 유저가 이동할 곳
    if (location.pathname === '/') {
        return <Navigate replace to='/' />;
    } else if (location.pathname === '/login') {
        return <Navigate replace to='/login' />;
    } else if (location.pathname === '/mover-sign-up') {
        return <Navigate replace to='/mover-sign-up' />;
    } else if (location.pathname === '/partner-sign-up') {
        return <Navigate replace to='/partner-sign-up' />;
    } else {
        alert('로그인 후 이용해주세요.');
        return <Navigate replace to='/login' />;
    }
}
