import { useAuth } from "@/api/authContext";
import { allowedRoles } from "@/authorization";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user } = useAuth();

  return allowedRoles.includes(user?.role) ? (
    <Outlet />
  ) : (
    <div>Only admins have access to this page.</div>
  );
};

export default AdminRoute;
