import ContentLayout from "@/layouts/ContentLayout";
import { useUserStore } from "@/store";
import { LayoutGrid } from "lucide-react";
import { Navigate } from "react-router-dom";
import { OrgAdminManagerDashboard, OrgTeacherDashboard, ParentDashboard, PlatformAdminDashboard, StudentDashboard } from "./RoleBasedDashboard";

const DefaultDashboard = () => {
  const { role } = useUserStore();
  const renderDashboard = () => {
    switch (role) {
      case "PlatformAdmin":
        return <PlatformAdminDashboard />;
      case "OrgAdmin":
      case "OrgManager":
        return <OrgAdminManagerDashboard />;
      case "OrgTeacher":
        return <OrgTeacherDashboard />;
      case "Parent":
        return <ParentDashboard />;
      case "Student":
        return <StudentDashboard />;
      default:
        return <Navigate to="/auth/login" replace />;
    }
  };
  return (
    <ContentLayout icon={LayoutGrid} title="Dashboard">
      {renderDashboard()}
    </ContentLayout>
  );
};

export default DefaultDashboard;
