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
import DefaultDashboardPage from "@/pages/DefaultDashboard";
import OrgManagerPage from "@/pages/OrgManager";
import ContactPage from "@/pages/Contacts";

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
        handle: { breadcrumb: "event list" }
      },
      {
        path: "tours",
        element: <TourPage />,
        handle: { breadcrumb: "tour list" }
      },
      {
        path: "organisations",
        element: <OrganisationPage />,
        handle: { breadcrumb: "organisation list" }
      },
      {
        path: "organisations/:id",
        element: (
          <ProtectedRoute allowedRoles={["platform admin", "organisation admin", "organisation manager", "organisation teacher", "parent", "student"]}>
            <OrganisationDetailPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "organisation profile & member" }
      },
      {
        path: "contacts",
        element: <ContactPage />,
        handle: { breadcrumb: "contact list" }
      },
      {
        path: "orgadmins",
        element: (
          <ProtectedRoute allowedRoles={["platform admin", "organisation admin"]}>
            <OrgAdminPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "organisation admin list" }
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
        handle: { breadcrumb: "organisation manager list" }
      },
      {
        path: "orgmanagers/:id",
        element: <ProfileDetailPage role="organisation manager" />,
        handle: { breadcrumb: "organisation manager profile" }
      },
      {
        path: "orgteachers",
        element: <OrgTeacherPage />,
        handle: { breadcrumb: "organisation teacher list" }
      },
      {
        path: "orgteachers/:id",
        element: <ProfileDetailPage role="organisation teacher" />,
        handle: { breadcrumb: "organisation teacher profile" }
      },
      {
        path: "parents",
        element: <ParentPage />,
        handle: { breadcrumb: "parent list" }
      },
      {
        path: "parents/:id",
        element: <ProfileDetailPage role="parent" />,
        handle: { breadcrumb: "parent profile" }
      },
      {
        path: "students",
        element: <StudentPage />,
        handle: { breadcrumb: "student list" }
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
