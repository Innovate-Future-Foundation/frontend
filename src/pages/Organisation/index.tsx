// import AppDataTable from "@/components/AppDataTable";
// import { orgColumns } from "./orgColumns";
import AppInviteeProfileForm from "@/components/AppInviteeProfileForm";

const OrganisationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* <AppDataTable columns={orgColumns} /> */}
      <AppInviteeProfileForm />
    </div>
  );
};

export default OrganisationPage;
