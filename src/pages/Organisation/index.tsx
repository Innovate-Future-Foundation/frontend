import AppDataTable from "@/components/AppDataTable";
import { orgColumns } from "./orgColumns";
import { InviteeList } from "@/components/InviteList";

const OrganisationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <AppDataTable columns={orgColumns} />
      <InviteeList />
    </div>
  );
};

export default OrganisationPage;
