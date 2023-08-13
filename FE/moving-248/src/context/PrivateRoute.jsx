import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { memberActiveApplyAtom, memberIdAtom, memberTypeAtom } from '../atom';

export default function PrivateRoute() {
    // const memberEmail = useRecoilValue(memberEmailAtom);
    const memberType = useRecoilValue(memberTypeAtom);
    const memberId = useRecoilValue(memberIdAtom);
    const memberActiveApply = useRecoilValue(memberActiveApplyAtom);

    const location = useLocation();
    const loginFreeList = ['partner-my-page'];
    const loginBlockList = ['login', 'mover-sign-up', 'partner-sign-up'];

    console.log(location.pathname);
    const inputLocation = location.pathname;
    const inputArray = inputLocation.split('/');

    // 로그인 유저는 모든 페이지 접근 가능
    if (memberId !== '') {
        console.log('--------------');
        console.log(loginBlockList.includes(inputArray[1]));
        console.log('--------------');

        // // 메인 페이지 접근
        // if (inputArray.length === 1) {
        //     return <Navigate replace to='/' />;
        // }
        // // 로그인 시 자유로운 페이지 접근
        // else if (loginFreeList.includes(inputArray[1])) {
        //     return <Outlet />;
        // }
        // // 로그인 시 사용이 불가능한 페이지 접근
        // else if (loginBlockList.includes(inputArray[1])) {
        //     alert('접근이 불가능한 페이지입니다.');
        //     return <Navigate replace to='/' />;
        // }

        // 무버 마이페이지 접근 == 본인만
        if (inputArray[1] === 'mover-my-page') {
            if (memberType === 'u' && Number(memberId) === Number(inputArray[2])) {
                return <Outlet />;
            } else {
                alert('잘못된 페이지 접근입니다.');
                return <Navigate replace to='/' />;
            }
        }
        // 신청서 리스트 접근 == 파트너s
        else if (inputArray[1] === 'apply-list') {
            if (memberType === 'p') {
                return <Outlet />;
            } else {
                alert('잘못된 페이지 접근입니다.');
                return <Navigate replace to='/' />;
            }
        }
        // 신청서 상세 접근 == 작성자 or 파트너s
        else if (inputArray[1] === 'apply-detail') {
            if (memberType === 'p' || Number(memberActiveApply) === Number(inputArray[2])) {
                return <Outlet />;
            } else {
                alert('접근 권한이 없습니다.');
                return <Navigate replace to='/' />;
            }
        }
        // 신청서 작성 페이지 == 무버s
        else if (inputArray[1] === 'apply-form') {
            if (memberType === 'u') {
                return <Outlet />;
            } else {
                alert('잘못된 페이지 접근입니다.');
                return <Navigate replace to='/' />;
            }
        } else {
            // 이거 없애야함 angel !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            return <Outlet />;
        }
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
