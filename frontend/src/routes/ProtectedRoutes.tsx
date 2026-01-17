import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, getRole } from "../utils/auth";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: Props) => {
  if (!isAuthenticated()) {
    return (<Navigate to="/login" replace />);
  }

  const role = getRole();
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>
};

export default ProtectedRoute;
