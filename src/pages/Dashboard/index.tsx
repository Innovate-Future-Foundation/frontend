import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { authApis } from "@/services/apiServices/authApis";
import { useAuth } from "@/hooks/use-auth";
import { RoleType } from "@/types";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import DashboardContent from "./DashboardContent";

const testRoles: RoleType[] = ["platform admin", "organisation admin", "organisation manager", "organisation teacher", "parent", "student"];

const DashboardPage = () => {
  const { role, setRole } = useAuth();
  const navigate = useNavigate();
  const url = window.location.href;
  const arr = url.split("code=");
  const code = arr.length === 2 ? arr[1] : "";

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        try {
          const queryParams = new URLSearchParams({ code: code });
          const response = await authApis.getTokenReq(queryParams);
          console.log(response);
          //   const { email } = response;
          //todo: call get user by email
          //const userData = await userApis.getUserByEmailReq(email);
          //const { roleCodeName } = userData;
          //todo: save user+profile info to state
        } catch (err) {
          console.error(err);
        }
      };
      getToken();
    }
  }, [code]);

  const handleRoleChange = (newRole: RoleType) => {
    setRole(newRole);
    // redirect to different page
    switch (newRole) {
      case "platform admin":
      case "organisation admin":
      case "organisation manager":
      case "organisation teacher":
      case "parent":
      case "student":
        navigate("/dashboard/organisations/1"); // assume organisation id is 1
        break;
      default:
        navigate("/dashboard");
    }
  };

  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <div className="flex justify-end mb-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Test Role Switcher</h2>
          <div className="flex gap-2 flex-wrap">
            {testRoles.map(testRole => (
              <Button key={testRole} variant={role === testRole ? "default" : "outline"} onClick={() => handleRoleChange(testRole)} className="capitalize">
                {testRole}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <DashboardContent name={role} codeName={"1"} />
    </MainLayout>
  );
};

export default DashboardPage;
