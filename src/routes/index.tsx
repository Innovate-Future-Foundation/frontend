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
import ContactLeader from "@/pages/TourBuilder/ContactLeader";
import Schedule from "@/pages/TourBuilder/Schedule";
import StudentsEnrollment from "@/pages/TourBuilder/StudentsEnrollment";
import TourDetails from "@/pages/TourBuilder/TourDetails";
import DayBuilder from "@/pages/TourBuilder/Schedule/DayBuilder";
import ActivityBuilder from "@/pages/TourBuilder/Schedule/ActivityBuilder";
import TourDetailPage from "@/pages/Tour/TourDetailPage";
import EmailVerification from "@/pages/Authentication/EmailVerification";
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
    path: "auth",
    element: <AuthenticationPage />,
    children: [
      {
        index: true,
        element: <LoginForm />
      },
      {
        path: "signup",
        element: <RegisterForm />
      },
      {
        path: "forgotpassword",
        element: <ForgotPasswordForm />
      }
    ]
  },
  {
    path: "auth/signup/email-verification",
    element: <EmailVerification />
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DefaultDashboardPage />,
        handle: { breadcrumb: "dashboard" }
      },
      {
        path: "events",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin"]}>
            <EventPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "event list" }
      },
      {
        path: "tours",
        element: <TourPage />,
        handle: { breadcrumb: "tour list" }
      },
      {
        path: "tours:id",
        element: <TourDetailPage />
      },
      {
        path: "organisations",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin"]}>
            <OrganisationPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "organisation list" }
      },
      {
        path: "organisations/:id",
        element: <OrganisationDetailPage />,
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
          <ProtectedRoute allowedRoles={["PlatformAdmin"]}>
            <OrgAdminPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Admin list" }
      },
      {
        path: "orgadmins/:id",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin"]}>
            <ProfileDetailPage role="OrgAdmin" />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Admin profile" }
      },
      {
        path: "orgmanagers",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin"]}>
            <OrgManagerPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Manager list" }
      },
      {
        path: "orgmanagers/:id",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager"]}>
            <ProfileDetailPage role="OrgManager" />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Manager profile" }
      },
      {
        path: "orgteachers",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager"]}>
            <OrgTeacherPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Teacher list" }
      },
      {
        path: "orgteachers/:id",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager", "OrgTeacher"]}>
            <ProfileDetailPage role="OrgTeacher" />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Organisation Teacher profile" }
      },
      {
        path: "parents",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager", "OrgTeacher"]}>
            <ParentPage />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Parent list" }
      },
      {
        path: "parents/:id",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager", "OrgTeacher", "Parent"]}>
            <ProfileDetailPage role="Parent" />
          </ProtectedRoute>
        ),
        handle: { breadcrumb: "Parent profile" }
      },
      {
        path: "students",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager", "OrgTeacher", "Parent"]}>
            <StudentPage />
          </ProtectedRoute>
        ),
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
    path: "tours",
    children: [
      {
        path: ":id",
        element: (
          <ProtectedRoute allowedRoles={["PlatformAdmin", "OrgAdmin", "OrgManager"]}>
            <TourBuilderPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <TourDetails />
          },
          {
            path: "summary",
            element: <TourDetails />
          },
          {
            path: "leader",
            element: <ContactLeader />
          },
          {
            path: "schedule",
            element: <Schedule />,
            children: [
              {
                index: true,
                element: <DayBuilder />
              },
              {
                path: "days",
                element: <DayBuilder />
              },
              {
                path: "days/:id",
                element: <ActivityBuilder />
              }
            ]
          },
          {
            path: "studentsEnrollment",
            element: <StudentsEnrollment />
          }
        ]
      }
    ]
  }
];

export default router;
