import HomePage from "@/pages/MainLayout/HomePage";
import DashboardPage from "@/pages/MainLayout/DashboardPage";
import MainLayout from "@/pages/MainLayout";
// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const router = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "dashboard",
        element: (
          // <ProtectedRoute>
          <DashboardPage />
          // </ProtectedRoute>
        )
      }
    ]
  }
];

export default router;
