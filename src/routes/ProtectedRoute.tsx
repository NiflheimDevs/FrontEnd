// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem("authToken");

  // If token exists, render the child routes (private pages)
  // If no token, redirect to /auth
  return token ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;