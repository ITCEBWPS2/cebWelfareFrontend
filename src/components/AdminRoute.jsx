import { useAuth } from "@/api/authContext";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useAuth();

  const allowedRoles = [
    "admin",
    "super_admin",
    "president",
    "vice_president",
    "secretary",
    "assistant_secretary",
    "treasurer",
    "assistant_treasurer",
  ];

  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <div>Only admins have access to this page.</div>
  );
};

export default AdminRoute;
