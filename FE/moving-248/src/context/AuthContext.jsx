import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { state: authState } = useContext(AuthContext);

    // 반드시 <Outlet />을 써야한다.
    return authState.isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoutes;
