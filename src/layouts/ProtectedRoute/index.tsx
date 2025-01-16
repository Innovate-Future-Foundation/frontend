import { COGNITO_LOGIN_URL } from "@/constants/apiConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    window.location.href = COGNITO_LOGIN_URL;
    return null;
  }
  return children;
};

export default ProtectedRoute;
