import { LayoutGrid } from "lucide-react";

import ContentLayout from "@/layouts/ContentLayout";
import { Button } from "@/components/ui/button";
import InviteModal from "../Dashboard/components/InviteModal";

const DefaultDashboardPage = () => {
  const handleSubmit = async () => {
    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <ContentLayout icon={LayoutGrid} title={"dashboard"}>
      <InviteModal roleInvited={"student"} onSubmit={handleSubmit}>
        <Button>invite user</Button>
      </InviteModal>
    </ContentLayout>
  );
};

export default DefaultDashboardPage;
