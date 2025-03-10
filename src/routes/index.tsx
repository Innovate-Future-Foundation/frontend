import { RouteObject } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
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
import OrgManagerPage from "@/pages/OrgManager";
import ContactPage from "@/pages/Contacts";
import TourBuilderPage from "@/pages/TourBuilder";
import ForgotPasswordForm from "@/pages/Authentication/ForgotPasswordForm";
import LoginForm from "@/pages/Authentication/LoginForm";
import ContactLeader from "@/pages/TourBuilder/ContactLeader";
import Schedule from "@/pages/TourBuilder/Schedule";
import StudentsEnrollment from "@/pages/TourBuilder/StudentsEnrollment";
import TourDetails from "@/pages/TourBuilder/TourDetails";
import DayBuilder from "@/pages/TourBuilder/Schedule/DayBuilder";
import ActivityBuilder from "@/pages/TourBuilder/Schedule/ActivityBuilder";
import TourDetailPage from "@/pages/Tour/TourDetailPage";
import EmailVerification from "@/pages/Authentication/EmailVerification";
import HomePage from "@/pages/Home";
import RedirectRoute from "@/components/ProtectedRoute/RedirectRoute";
import ResetPassword from "@/pages/Authentication/ResetPassword";
import DefaultDashboard from "@/pages/DefaultDashboard";
import RegisterForm from "@/pages/Authentication/RegisterForm";

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
    element: (
      <RedirectRoute>
        <AuthenticationPage />
      </RedirectRoute>
    ),
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
        path: "forgot-password",
        element: <ForgotPasswordForm />
      }
    ]
  },
  {
    path: "auth/signup/email-verification",
    element: <EmailVerification />
  },
  {
    path: "auth/reset-password",
    element: <ResetPassword />
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
        element: <DefaultDashboard />,
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
        path: "tours/:id",
        element: <TourDetailPage />
      },
      {
        path: "organisations",
        element: <OrganisationPage />,
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
        element: <OrgAdminPage />,
        handle: { breadcrumb: "Organisation Admin list" }
      },
      {
        path: "orgadmins/:id",
        element: <ProfileDetailPage role="OrgAdmin" />,
        handle: { breadcrumb: "Organisation Admin profile" }
      },
      {
        path: "orgmanagers",
        element: <OrgManagerPage />,
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
      },
      {
        path: "profile",
        element: <ProfileDetailPage />,
        handle: { breadcrumb: "My profile" }
      }
    ]
  },
  {
    path: "tours",
    children: [
      {
        path: ":id",
        element: (
          <ProtectedRoute>
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
