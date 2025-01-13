import AppDataTable from "@/components/AppDataTable";
import { orgColumns } from "./orgColumns";

const OrganisationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      <AppDataTable columns={orgColumns} />
    </div>
  );
};

export default OrganisationPage;
