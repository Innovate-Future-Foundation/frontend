import { authApis } from "@/services/apiServices/authApis";
import { useEffect } from "react";

interface ResponseTokens {
  id: string;
  access: string;
  refresh: string;
}

interface ApiResponse {
  success: boolean;
  tokens: ResponseTokens;
}

const DashboardPage: React.FC = () => {
  const url = window.location.href;
  const arr = url.split("code=");
  const code = arr.length === 2 ? arr[1] : "";

  const handleInvite = async () => {
    const response = await authApis.inviteReq();
    console.log(response.data);
  };

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        try {
          const queryParams = new URLSearchParams({ code: code });
          const axiosResponse = await authApis.getTokenReq(queryParams);
          const response: ApiResponse = axiosResponse.data;
          // save them to local storage
          localStorage.setItem("IdToken", response.tokens.id);
          localStorage.setItem("accessToken", response.tokens.access);
          localStorage.setItem("refreshToken", response.tokens.refresh);
        } catch (err) {
          console.error(err);
        }
      };

      getToken();
    }
  }, []);

  return (
    <div>
      DashboardPage
      <div className="flex gap-3">
        <label htmlFor="email">Email:</label>
        <input className="border" type="email" name="email" />
        <label htmlFor="name">Name:</label>
        <input className="border" type="text" name="name" />
        <button className="border border-black px-4" onClick={handleInvite}>
          invite
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
