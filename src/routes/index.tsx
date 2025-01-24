import { RouteObject } from "react-router-dom";

import HomePage from "@/pages/Home";
import AuthenticationPage from "@/pages/Authentication";
import DashboardPage from "@/pages/Dashboard";
import OrganisationPage from "@/pages/Organisation";
import OrganisationDetailPage from "@/pages/Organisation/OrganisationDetailPage";
import ParentsPage from "@/pages/Parent";
import StudentPage from "@/pages/Student";
import TourPage from "@/pages/Tour";
import ProfileDetailPage from "@/pages/Profile/ProfileDetailPage";
import TeacherPage from "@/pages/Teacher";
import StuffPage from "@/pages/Stuff";
import OrganisationRegisterPage from "@/pages/Authentication/OrganisationRegister";

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
    children: [
      {
        index: true,
        element: <AuthenticationPage />
      },
      {
        path: "organisation-register",
        element: <OrganisationRegisterPage />
      }
    ]
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
        path: "orgstuffs",
        element: <StuffPage />,
        handle: { breadcrumb: "organisation stuffs list" }
      },
      {
        path: "orgstuffs/:id",
        element: <ProfileDetailPage role="organisation stuff" />,
        handle: { breadcrumb: "organisation stuff profile" }
      },
      {
        path: "teachers",
        element: <TeacherPage />,
        handle: { breadcrumb: "organisation teachers list" }
      },
      {
        path: "teachers/:id",
        element: <ProfileDetailPage role="organisation teacher" />,
        handle: { breadcrumb: "organisation teacher profile" }
      },
      {
        path: "parents",
        element: <ParentsPage />,
        handle: { breadcrumb: "parents list" }
      },
      {
        path: "parents/:id",
        element: <ProfileDetailPage role="parent" />,
        handle: { breadcrumb: "parent profile" }
      },
      {
        path: "students",
        element: <StudentPage />,
        handle: { breadcrumb: "students list" }
      },
      {
        path: "students/:id",
        element: <ProfileDetailPage role="student" />,
        handle: { breadcrumb: "student profile" }
      }
    ]
  }
];

export default router;
