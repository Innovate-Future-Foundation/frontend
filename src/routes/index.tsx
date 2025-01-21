import HomePage from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import EventPage from "@/pages/EventPage";
import ContactUs from "@/pages/ContactUs";
// import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const router = [
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "about-us",
    element: <AboutUs />
  },
  {
    path: "contact-us",
    element: <ContactUs />
  },
  {
    path: "eventpage",
    element: <EventPage />
  }
];

export default router;
