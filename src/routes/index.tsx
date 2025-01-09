import DashboardPage from "@/pages/DashboardPage";
import HomePage from "@/pages/HomePage";
import OrganisationPage from "@/pages/OrganisationPage";
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
      }
    ]
  }
];

export default router;
