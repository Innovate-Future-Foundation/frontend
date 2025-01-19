import { RouteObject } from "react-router-dom";

import HomePage from "@/pages/Home";
import AuthenticationPage from "@/pages/Authentication";
import DashboardPage from "@/pages/Dashboard";
import OrganisationPage from "@/pages/Organisation";
import OrganisationDetailPage from "@/pages/Organisation/OrganisationDetailPage";
import TeacherPage from "@/pages/Teacher";
import ParentsPage from "@/pages/Parent";
import StudentPage from "@/pages/Student";
import TourPage from "@/pages/Tour";
// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

export type AppRoute = RouteObject & {
  handle?: {
    breadcrumb?: string;
  };
};

const router: AppRoute[] = [
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
        element: <TourPage />,
        handle: { breadcrumb: "tours list" }
      },
      {
        path: "organisations",
        element: <OrganisationPage />,
        handle: { breadcrumb: "organisations list" }
      },
      {
        path: "organisations/:id",
        element: <OrganisationDetailPage />,
        handle: { breadcrumb: "organisation profile & members" }
      },
      {
        path: "teachers",
        element: <TeacherPage />,
        handle: { breadcrumb: "teachers list" }
      },
      {
        path: "parents",
        element: <ParentsPage />,
        handle: { breadcrumb: "parents list" }
      },
      {
        path: "students",
        element: <StudentPage />,
        handle: { breadcrumb: "students list" }
      }
    ]
  }
];

export default router;
