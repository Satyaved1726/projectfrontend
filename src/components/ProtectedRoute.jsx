import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ component: Component, requiredRole }) {
  const token = localStorage.getItem('jwt');
  const userRole = localStorage.getItem('userRole');

  // Check if user is authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!roles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
  }

  return <Component />;
}
