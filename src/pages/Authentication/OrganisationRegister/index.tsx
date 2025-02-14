import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

interface OrganisationRegisterPageProps {
  onBackToLogin: () => void;
}

const OrganisationRegisterPage: FC<OrganisationRegisterPageProps> = ({ onBackToLogin }) => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    onBackToLogin();
    navigate("/auth");
  };

  return <RegisterForm onBackToLogin={handleBackToLogin} />;
};

export default OrganisationRegisterPage;
