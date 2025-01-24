import { FC } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";

const OrganisationRegisterPage: FC = () => {
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/auth");
  };

  return <RegisterForm onBackToLogin={handleBackToLogin} />;
};

export default OrganisationRegisterPage;
