import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

const AdminRoute = () => {
  const { user, hasFetchedUser, loading } = useAuthStore();

  console.log("AdminRoute render:", { loading, hasFetchedUser, user });

  if (!hasFetchedUser) return <div>Loading user...</div>; // wait for fetchUser to finish
  if (!user) {
    console.log("Redirect: user not logged in");
    return <Navigate to="/" replace />;
  }

  const isAdmin = user.roles?.includes("ADMIN");
  console.log("isAdmin:", isAdmin);

  if (!isAdmin) {
    console.log("Redirect: user is not admin");
    return <Navigate to="/" replace />;
  }

  console.log("Access granted: admin");
  return <Outlet />;
};

export default AdminRoute;