import React from 'react'
import { Navigate,Outlet } from 'react-router-dom';

const AuthRoute = () => {
    const isToken = sessionStorage.getItem("@authToken");
    return isToken ?  <Navigate to="/dashboard" /> : <Outlet />;
}

export default AuthRoute
