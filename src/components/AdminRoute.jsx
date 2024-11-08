import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo.role === "admin" ? (
    <Outlet />
  ) : (
    "Only admins have access to this page."
  );
};

export default AdminRoute;
