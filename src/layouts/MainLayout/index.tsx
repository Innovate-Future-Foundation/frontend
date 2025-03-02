import { ReactNode, useEffect } from "react";

import Header from "@/components/Header";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store";
import { useGetMe } from "@/hooks/auth/useGetMe";
import { FadeLoader } from "react-spinners";

// const myProfile: MyInfo = {
//   id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//   name: "Chelsea",
//   email: "chelsea@exmaple.com",
//   defaultProfile: {
//     id: "5e94ea59-a496-40b5-a6b4-a57bcd058aba",
//     organisation: {
//       id: "0dad9751-f94b-4d11-a2ce-d93e72e47c9b",
//       orgName: "Acme Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.acmecorp.com",
//       address: {
//         street: "60 Walkerville St",
//         suburb: "Gelberton",
//         state: "SA",
//         postCode: "5071",
//         country: "AU"
//       },
//       email: "info@acmecorp.com",
//       subscriptionCode: "Premium",
//       orgStatusCode: "Active",
//       createdAt: "2023-12-10T12:34:56Z",
//       updatedAt: "2023-12-06T22:20:00Z"
//     },
//     roleCode: "OrgAdmin",
//     inviter: null,
//     name: "Marry Johnson",
//     email: "alice.Green@example.com",
//     phone: "+61 452345678",
//     avatarUrl: "https://github.com/shadcn.png",
//     isActive: true,
//     isConfirmed: true,
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   }
// };
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { setRole, setOrganisationId, setUserProfile, userProfile, setOrganisation, isAuthenticated, setIsAuthenticated } = useAuthStore();

  //todo: wait geMe api
  const { isLoadingGetMe, myDetailResponse, isSuccessGetMe } = useGetMe({ enabled: !userProfile || !isAuthenticated });

  useEffect(() => {
    if (isSuccessGetMe) {
      setIsAuthenticated(true);
      setRole(myDetailResponse?.roleCode ?? null);
      setOrganisationId(myDetailResponse?.organisation?.id ?? null);
      setUserProfile(myDetailResponse ?? null);
      setOrganisation(myDetailResponse?.organisation ?? null);
    }
  }, [setRole, setOrganisationId, setUserProfile, setOrganisation, myDetailResponse, isSuccessGetMe, setIsAuthenticated]);

  return (
    <div className="flex flex-col w-full">
      {isLoadingGetMe ? (
        <div className="w-full h-screen flex items-center justify-center">
          <FadeLoader />
        </div>
      ) : (
        <>
          <Header fromHome={!pathname.includes("dashboard")} />
          <div className="pt-14">{children}</div>
        </>
      )}
    </div>
  );
};
export default MainLayout;
