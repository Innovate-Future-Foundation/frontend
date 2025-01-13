import OrganisationDetailPage from "./OrganisationDetailPage";

const OrganisationPage = () => {
  return (
    <div className="w-full flex flex-col justify-center">
      {/* <AppDataTable columns={orgColumns} /> */}
      <OrganisationDetailPage />
    </div>
  );
};

export default OrganisationPage;
