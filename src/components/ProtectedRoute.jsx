// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Get the token from localStorage

  if (!token) {
    // If no token is found, redirect to login
    return <Navigate to="/login" />;
  }

  // If token exists, render the children (i.e., the protected component)
  return children;
};

export default ProtectedRoute;
