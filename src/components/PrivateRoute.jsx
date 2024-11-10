import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/api/authContext";

const PrivateRoute = () => {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
