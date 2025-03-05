import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
// import { RoleType } from "@/types";

interface RedirectRouteProps {
  children: React.ReactNode;
  // allowedRoles?: RoleType[];
}

const RedirectRoute = ({ children }: RedirectRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  // if (role && !allowedRoles?.includes(role)) {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <>{children}</>;
};

export default RedirectRoute;
