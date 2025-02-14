import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { RoleType } from "@/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: RoleType[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
