import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const isToken = sessionStorage.getItem("@authToken");
  return isToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
