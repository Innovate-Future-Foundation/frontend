import AppDataTable from "@/components/AppDataTable";
import { TitleWithIcon } from "@/components/TitleWithIcon/GuestListTitle";
import { Users } from "lucide-react";
import { orgColumns } from "./orgColumns";

const OrganisationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <AppDataTable columns={orgColumns} />
      <TitleWithIcon icon={Users} title="Organisation List" />
    </div>
  );
};

export default OrganisationPage;
