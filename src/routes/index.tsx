import HomePage from "@/pages/Home";
import AuthenticationPage from "@/pages/Authentication";
import DashboardPage from "@/pages/Dashboard";
import OrganisationPage from "@/pages/Organisation";
import OrganisationDetailPage from "@/pages/Organisation/OrganisationDetailPage";
import TeacherPage from "@/pages/Teacher";
import ParentsPage from "@/pages/Parents";
import StudentPage from "@/pages/Student";
import TourPage from "@/pages/Tour";
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
        path: "organisations/:id",
        element: <OrganisationDetailPage />
      },
      {
        path: "teachers",
        element: <TeacherPage />
      },
      {
        path: "parents",
        element: <ParentsPage />
      },
      {
        path: "students",
        element: <StudentPage />
      },
      {
        path: "tours",
        element: <TourPage />
      }
    ]
  }
];

export default router;
