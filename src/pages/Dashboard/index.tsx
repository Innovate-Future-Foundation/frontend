import { useEffect } from "react";

import { authApis } from "@/services/apiServices/authApis";
import MainLayout from "@/layouts/MainLayout";
import DashboardContent from "./DashboardContent";

const DashboardPage = () => {
  const url = window.location.href;
  const arr = url.split("code=");
  const code = arr.length === 2 ? arr[1] : "";

  //todo: hardcode
<<<<<<< HEAD
=======
  const roleName = "platform admin";

>>>>>>> 582791b (Restore dashboard folder from dev)
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

<<<<<<< HEAD
  return (
    <MainLayout>
      <DashboardContent />
=======
  //todo: indicator
  if (!roleName) {
    return <div>Loading...</div>;
  }

  return (
    <MainLayout>
      <DashboardContent name={roleName} codeName={"1"} />
>>>>>>> 582791b (Restore dashboard folder from dev)
    </MainLayout>
  );
};

export default DashboardPage;
