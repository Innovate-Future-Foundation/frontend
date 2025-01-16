import DashboardPage from "@/pages/Dashboard";
import HomePage from "@/pages/Home";
import OrganisationPage from "@/pages/Organisation";
import OrganisationDetailPage from "@/pages/Organisation/OrganisationDetailPage";
// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const router = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "dashboard",
    element: (
      // <ProtectedRoute>
      <DashboardPage />
      // </ProtectedRoute>
    ),
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
