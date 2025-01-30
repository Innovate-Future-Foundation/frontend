import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

import HomePage from "@/pages/Home";
import AuthenticationPage from "@/pages/Authentication";
import DashboardPage from "@/pages/Dashboard";
import OrganisationPage from "@/pages/Organisation";
import OrganisationDetailPage from "@/pages/Organisation/OrganisationDetailPage";
import ParentPage from "@/pages/Parent";
import StudentPage from "@/pages/Student";
import TourPage from "@/pages/Tour";
import ProfileDetailPage from "@/pages/Profile/ProfileDetailPage";
import OrgTeacherPage from "@/pages/OrgTeacher";
import OrgAdminPage from "@/pages/OrgAdmin";
import EventPage from "@/pages/Event";
import UserPage from "@/pages/Contacts";
import DefaultDashboardPage from "@/pages/DefaultDashboard";
import OrgManagerPage from "@/pages/OrgManager";

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
        element: <DefaultDashboardPage />,
        handle: { breadcrumb: "dashboard" }
      },
      {
        path: "events",
        element: <EventPage />,
        handle: { breadcrumb: "events list" }
      },
      {
        path: "tours",
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
        element: (
          <ProtectedRoute allowedRoles={["platform admin", "organisation admin", "organisation manager", "organisation teacher", "parent", "student"]}>
            <OrganisationDetailPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "organisation profile & members" }
      },
      {
        path: "users",
        element: <UserPage />,
        handle: { breadcrumb: "users list" }
      },
      {
        path: "users/:id",
        element: <ProfileDetailPage role="user" />,
        handle: { breadcrumb: "user profile" }
      },
      {
        path: "orgadmins",
        element: (
          <ProtectedRoute allowedRoles={["platform admin", "organisation admin"]}>
            <OrgAdminPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "organisation admins list" }
      },
      {
        path: "orgadmins/:id",
        element: <ProfileDetailPage role="organisation admin" />,
        handle: { breadcrumb: "organisation admin profile" }
      },
      {
        path: "orgmanagers",
        element: (
          <ProtectedRoute allowedRoles={["platform admin", "organisation admin", "organisation manager"]}>
            <OrgManagerPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "organisation managers list" }
      },
      {
        path: "orgmanagers/:id",
        element: <ProfileDetailPage role="organisation manager" />,
        handle: { breadcrumb: "organisation manager profile" }
      },
      {
        path: "orgteachers",
        element: <OrgTeacherPage />,
        handle: { breadcrumb: "organisation teachers list" }
      },
      {
        path: "orgteachers/:id",
        element: <ProfileDetailPage role="organisation teacher" />,
        handle: { breadcrumb: "organisation teacher profile" }
      },
      {
        path: "parents",
        element: <ParentPage />,
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
