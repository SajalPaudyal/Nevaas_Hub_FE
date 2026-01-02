import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import type { RootState } from "../../store/store";

interface ProtectedRouteProps {
  allowedRole: "admin" | "user";
}

const ProtectedRoute = ({ allowedRole }: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
