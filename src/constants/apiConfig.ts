export const API_BASE_URL = import.meta.env.VITE_REACT_APP_INNOVATE_FUTURE_API_BASE_URL || "http://localhost:5091";
export const API_REQUEST_TIMEOUT = import.meta.env.VITE_REACT_APP_INNOVATE_FUTURE_API_REQUEST_TIMEOUT || 30000;

const COGNITO_CONFIG = {
  COGNITO_DOMAIN: import.meta.env.VITE_REACT_APP_COGNITO_DOMAIN,
  CLIENT_ID: import.meta.env.VITE_REACT_APP_CLIENT_ID,
  REDIRECT_URI: import.meta.env.VITE_REACT_APP_REDIRECT_URI,
  RESPONSE_TYPE: "code",
  SCOPES: ["email", "openid"]
};

export const COGNITO_LOGIN_URL = `${COGNITO_CONFIG.COGNITO_DOMAIN}/login?client_id=${COGNITO_CONFIG.CLIENT_ID}&response_type=${COGNITO_CONFIG.RESPONSE_TYPE}&scope=${COGNITO_CONFIG.SCOPES.join("+")}&redirect_uri=${COGNITO_CONFIG.REDIRECT_URI}`;

export const API_ENDPOINTS = {
  API_V1: "/api/v1",
  USER: "/users",
  TOUR: "/tours",
  ROLE: "/roles",
  AUTH: "/auth",
  INVITE: "/invite",
  TOKEN: "/token",
  ORGANISATION: "/organisations"
};
