import HomePage from "@/pages/Home";
import AuthenticationPage from "@/pages/Authentication";
import DashboardPage from "@/pages/Dashboard";
import OrganisationPage from "@/pages/Organisation";
import OrganisationDetailPage from "@/pages/Organisation/OrganisationDetailPage";
// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const router = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/auth",
    element: <AuthenticationPage />
  },
  {
    path: "dashboard",
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <OrganisationPage />
      },
      {
        path: "organisation/:id",
        element: <OrganisationDetailPage />
      }
    ]
  }
];

export default router;
