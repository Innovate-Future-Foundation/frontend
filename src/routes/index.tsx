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
import TourBuilderPage from "@/pages/TourBuilder";
import ForgotPasswordForm from "@/pages/Authentication/ForgotPasswordForm";
import LoginForm from "@/pages/Authentication/LoginForm";
import RegisterForm from "@/pages/Authentication/RegisterForm";
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
    element: <AuthenticationPage />,
    children: [
      {
        index: true,
        element: <LoginForm />
      },
      {
        path: "login",
        element: <LoginForm />
      },
      {
        path: "register",
        element: <RegisterForm />
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordForm />
      }
    ]
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
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager", "OrgTeacher", "Parent", "Student"]}>
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
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin"]}>
            <OrgAdminPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Admin list" }
      },
      {
        path: "orgadmins/:id",
        element: <ProfileDetailPage role="OrgAdmin" />,
        handle: { breadcrumb: "Organisation Admin profile" }
      },
      {
        path: "orgmanagers",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager"]}>
            <OrgManagerPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Manager list" }
      },
      {
        path: "orgmanagers/:id",
        element: <ProfileDetailPage role="OrgManager" />,
        handle: { breadcrumb: "Organisation Manager profile" }
      },
      {
        path: "orgteachers",
        element: <OrgTeacherPage />,
        handle: { breadcrumb: "Organisation Teacher list" }
      },
      {
        path: "orgteachers/:id",
        element: <ProfileDetailPage role="OrgTeacher" />,
        handle: { breadcrumb: "Organisation Teacher profile" }
      },
      {
        path: "parents",
        element: <ParentPage />,
        handle: { breadcrumb: "Parent list" }
      },
      {
        path: "parents/:id",
        element: <ProfileDetailPage role="Parent" />,
        handle: { breadcrumb: "Parent profile" }
      },
      {
        path: "students",
        element: <StudentPage />,
        handle: { breadcrumb: "Student list" }
      },
      {
        path: "students/:id",
        element: <ProfileDetailPage role="Student" />,
        handle: { breadcrumb: "Student profile" }
      }
    ]
  },
  {
    path: "/tourBuilder",
    children: [
      {
        index: true,
        element: <TourBuilderPage />
      }
    ]
  }
];

export default router;
