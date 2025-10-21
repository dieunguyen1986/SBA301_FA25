import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/UserProvider";

 export const ProtectedRoute = ({children, allowedRoles}) => {
  const { users, loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Hoặc một spinner/loading indicator khác
  }

  console.log("ProtectedRoute - Current user:", users);

  if (!users) {
    // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" replace />;
  }

  const hasAccess = users.roles.some(role => allowedRoles.includes(role));

  if (!hasAccess) {
    // Nếu không có quyền truy cập, chuyển hướng đến trang không được phép
    return <Navigate to="/unauthorized" replace />;
   
  }

      return children;
};