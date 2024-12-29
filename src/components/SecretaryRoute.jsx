import { useAuth } from "@/api/authContext";
import { Outlet } from "react-router-dom";

const SecretaryRoute = () => {
  const { user } = useAuth();
  return (user && user.role === "super_admin") ||
    user.role === "secretary" ||
    user.role === "assistant_secretary" ? (
    <Outlet />
  ) : (
    <div>Only Super Admins and Secretaries have access to this page.</div>
  );
};

export default SecretaryRoute;
