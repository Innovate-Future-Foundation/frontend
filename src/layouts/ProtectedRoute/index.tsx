import { COGNITO_LOGIN_URL } from "@/constants/apiConfig";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    // Redirect to Cognito
    window.location.href = COGNITO_LOGIN_URL;
    return null; // Prevent rendering protected content
  }
  return children;
};

export default ProtectedRoute;
