export const API_BASE_URL = import.meta.env.VITE_REACT_APP_INNOVATE_FUTURE_API_BASE_URL || "https://localhost:5173";
export const API_REQUEST_TIMEOUT = import.meta.env.VITE_REACT_APP_INNOVATE_FUTURE_API_REQUEST_TIMEOUT || 30000;
export const AWS_API_GATE_WAY_URL = import.meta.env.VITE_REACT_APP_API_GATE_WAY_DOMAIN;

const COGNITO_CONFIG = {
  COGNITO_DOMAIN: import.meta.env.VITE_REACT_APP_COGNITO_DOMAIN,
  CLIENT_ID: import.meta.env.VITE_REACT_APP_CLIENT_ID,
  REDIRECT_URI: import.meta.env.VITE_REACT_APP_REDIRECT_URI,
  RESPONSE_TYPE: "code",
  SCOPES: ["email", "openid"]
};

export const COGNITO_LOGIN_URL = `${COGNITO_CONFIG.COGNITO_DOMAIN}/login?client_id=${COGNITO_CONFIG.CLIENT_ID}&response_type=${COGNITO_CONFIG.RESPONSE_TYPE}&scope=${COGNITO_CONFIG.SCOPES.join("+")}&redirect_uri=${COGNITO_CONFIG.REDIRECT_URI}`;

export const API_ENDPOINTS = {
  USER: "/users",
  TOUR: "/tours",
  ROLE: "/roles",
  AUTH: "/auth",
  INVITE: "/invite",
  TOKEN: "/token"
};

export const WHITE_LIST_API = [API_ENDPOINTS.ROLE, `${API_ENDPOINTS.AUTH}${API_ENDPOINTS.TOKEN}`];
